import React, { useEffect, useState } from "react";
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
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import { register, login, checkJwt } from "../utils/auth";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isToolTipPopupOpen, setIsToolTipPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
	const [userEmail, setUserEmail] = useState('');

	const history = useHistory();
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
		setIsToolTipPopupOpen(false);
	};
	useEffect(() => {
		const closeByEscape = (e) => {
			if (e.key === "Escape") {
				closeAllPopUps();
			}
		};

		document.addEventListener("keydown", closeByEscape);

		return () => document.removeEventListener("keydown", closeByEscape);
	}, []);
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
		setIsLoading(true);
		api
			.setUserInfo({ name: userInfo.name, about: userInfo.about })
			.then((res) => {
				setCurrentUser(res);

				closeAllPopUps();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}
	function handleUpdateAvatar(userAvatar) {
		setIsLoading(true);
		api
			.setAvatar(userAvatar.avatar)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopUps();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}
	function handleAddPlaceSubmit(newCard) {
		setIsLoading(true);
		api
			.addCard({ name: newCard.name, link: newCard.link })
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopUps();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}
	function handleRegister(userData) {
		const { password, email } = userData;
		register(password, email)
			.then(() => {
				setIsRegisterSuccessful(true);
				history.push('/login');
			})
			.catch((err) => {
				setIsRegisterSuccessful(false);
				console.log(err);
			})
			.finally(() => setIsToolTipPopupOpen(true));
	}
	function handleLogin(userData) {
		const { password, email } = userData;
		login(password, email)
			.then((res) => {
				setIsLoggedIn(true);
				setUserEmail(email);
				history.push('/');
			})
			.catch((err) => {
				setIsRegisterSuccessful(false);
				setIsToolTipPopupOpen(true);
				console.log(err)
			});
	}
	const handleLogout = () => {
		localStorage.removeItem('jwt');
		setIsLoggedIn(false);
		history.push('/login');
	}
	useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt)
			checkJwt(jwt)
				.then((res) => {
					setUserEmail(res.data.email);
					setIsLoggedIn(true);
					history.push('/');
				})
				.catch((err) => console.log(err));
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<body className="body">
				<div className="page">
					<Header onLogout={handleLogout} email={userEmail} />
					<Switch>
						<ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
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
									isLoading={isLoading}
								/>
								<AddPlacePopup
									isOpen={isAddPlacePopupOpen}
									onClose={closeAllPopUps}
									onAddPlaceSubmit={handleAddPlaceSubmit}
									isLoading={isLoading}
								/>
								<EditAvatarPopup
									isOpen={isEditAvatarPopupOpen}
									onClose={closeAllPopUps}
									onUpdateAvatar={handleUpdateAvatar}
									isLoading={isLoading}
								/>
								<PopupWithForm
									name={"delete"}
									title={"Are you sure?"}
									onClose={closeAllPopUps}
									buttonText={"Yes"}
									isLoading={isLoading}
								/>
								<PopupWithImage
									onClose={closeAllPopUps}
									isOpen={isImagePopupOpen}
									selectedCard={selectedCard}
								/>
							</section>
							<Footer />
						</ProtectedRoute>
						<Route path={'/login'}>
							{isLoggedIn ? <Redirect to='/' /> : <Redirect to='/login' />}
							<Login onLogin={handleLogin} />
						</Route>
						<Route path={'/signup'}>
							{isLoggedIn ? <Redirect to='/' /> : <Redirect to='/signup' />}
							<Register onRegister={handleRegister} />
						</Route>
						<Route>
							{isLoggedIn ? <Redirect to='/' /> : <Redirect to='/login' />}
						</Route>
					</Switch>
				</div>
			</body>
			<InfoToolTip
				isOpen={isToolTipPopupOpen}
				onClose={closeAllPopUps}
				isRegisterSuccessful={isRegisterSuccessful}
			/>
		</CurrentUserContext.Provider>

	);
}

export default App;
