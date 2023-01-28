import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
	const [currentUser, setCurrentUser] = useState({});

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
					/>
					<section className="popups">
						<PopupWithForm
							name={"edit"}
							title={"Edit Form"}
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopUps}
							buttonText={"Save"}
						>
							<fieldset className="form__fieldset">
								<input
									type="text"
									id="name"
									name="name"
									className="form__input form__input_type_name"
									placeholder="Name Surname"
									required
									maxLength="40"
									minLength="2"
								/>
								<span className="form__input-error name-error"></span>
							</fieldset>
							<fieldset className="form__fieldset">
								<input
									type="text"
									id="description"
									name="description"
									className="form__input form__input_type_description"
									placeholder="Description"
									required
									maxLength="200"
									minLength="2"
								/>
								<span className="form__input-error description-error"></span>
							</fieldset>
						</PopupWithForm>

						<PopupWithForm
							name={"card"}
							title={"New place"}
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopUps}
							buttonText={"Create"}
						>
							<fieldset className="form__fieldset">
								<input
									type="text"
									id="place"
									name="place"
									className="form__input form__input_type_place"
									placeholder="Title"
									required
									maxLength="30"
									minLength="1"
								/>
								<span className="form__input-error place-error"></span>
							</fieldset>
							<fieldset className="form__fieldset">
								<input
									type="url"
									id="link"
									name="link"
									className="form__input form__input_type_link"
									placeholder="Image link"
									required
								/>
								<span className="form__input-error link-error"></span>
							</fieldset>
						</PopupWithForm>
						<PopupWithForm
							name={"avatar"}
							title={"Update profile picture"}
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopUps}
							buttonText={"Save"}
						>
							<fieldset className="form__fieldset">
								<input
									type="url"
									id="avatar-link"
									name="avatar-link"
									className="form__input form__input_type_link"
									placeholder="Avatar link"
									required
								/>
								<span className="form__input-error avatar-link-error"></span>
							</fieldset>
						</PopupWithForm>
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
