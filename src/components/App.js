import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api
			.getInitialCards()
			.then((res) => {
				setCards(res);
			})
			.catch((err) => console.log(err));
	}, []);

	React.useEffect(() => {
		api
			.getUserInfo()
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	};

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	};

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	};
	const handleCardClick = (card) => {
		setIsImagePopupOpen(true);
		setSelectedCard({ name: card.name, link: card.link });
	};

	const closeAllPopUps = () => {
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsImagePopupOpen(false);
	};

	function handleCardLike(card) {
		const isLiked = card.likes.some((user) => user._id === currentUser._id);
		api
			.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((currentCard) =>
						currentCard._id === card._id ? newCard : currentCard
					)
				);
			})
			.catch((err) => console.log(err));
	}
	function handleCardDelete(card) {
		api
			.removeCard(card._id)
			.then(() => {
				setCards((state) =>
					state.filter((currentCard) =>
						currentCard._id === card._id ? "" : currentCard
					)
				);
			})
			.catch((err) => console.log(err));
	}
	function handleUpdateUser(userInfo) {
		api
			.setUserInfo({ name: userInfo.name, about: userInfo.about })
			.then((res) => {
				setCurrentUser({ name: res.name, about: res.about, avatar: res.avatar });

				closeAllPopUps();
			})
			.catch((err) => console.log(err));
	}
	function handleUpdateAvatar(userAvatar) {
		api
			.setAvatar(userAvatar.avatar)
			.then((res) => {
				setCurrentUser({ name: res.name, about: res.about, avatar: res.avatar });
				closeAllPopUps();
			})
			.catch((err) => console.log(err));
	}
	function handleAddPlaceSubmit(newCard) {
		api
			.addCard({ name: newCard.name, link: newCard.link })
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopUps();
			})
			.catch((err) => console.log(err));
	}
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="body">
				<div className="page">
					<Header />
					<Main
						onEditProfileClick={handleEditProfileClick}
						onAddPlaceClick={handleAddPlaceClick}
						onEditAvatarClick={handleEditAvatarClick}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
						cards={cards}
					/>
					<section className="popups">
						<EditProfilePopup
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopUps}
							onUpdateUser={handleUpdateUser}
						/>
						<AddPlacePopup
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopUps}
							onAddPlaceSubmit={handleAddPlaceSubmit}
						/>
						<EditAvatarPopup
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopUps}
							onUpdateAvatar={handleUpdateAvatar}
						/>
						<PopupWithForm
							name={"delete"}
							title={"Are you sure?"}
							onClose={closeAllPopUps}
							buttonText={"Yes"}
						></PopupWithForm>
						<PopupWithImage
							onClose={closeAllPopUps}
							isOpen={isImagePopupOpen}
							selectedCard={selectedCard}
						></PopupWithImage>
					</section>
					<Footer />
				</div>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
