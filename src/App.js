import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
	const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	};

	const handleEditProfileClick = () => {
		setisEditProfilePopupOpen(true);
	};

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	};
	const handleCardClick = () => {};

	const closeAllPopUps = () => {
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setisEditProfilePopupOpen(false);
	};
	return (
		<div className="body">
			<div className="page">
				<Header />
				<Main
					onEditProfileClick={handleEditProfileClick}
					onAddPlaceClick={handleAddPlaceClick}
					onEditAvatarClick={handleEditAvatarClick}
					onCardClick={handleCardClick}
					isEditProfilePopupOpen={isEditProfilePopupOpen}
					isAddPlacePopupOpen={isAddPlacePopupOpen}
					isEditAvatarPopupOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopUps}
				/>
				<Footer />
			</div>
		</div>
	);
}

export default App;
