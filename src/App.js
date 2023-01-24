import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithImage from "./components/PopupWithImage";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

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
		<div className="body">
			<div className="page">
				<Header />
				<Main
					onEditProfileClick={handleEditProfileClick}
					onAddPlaceClick={handleAddPlaceClick}
					onEditAvatarClick={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onClose={closeAllPopUps}
					selectedCard={selectedCard}
				/>
				<section className="popups">
					<PopupWithForm
						name={"edit"}
						title={"Edit Form"}
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopUps}
					>
						<form className="form form_type_edit" name="edit-form" noValidate>
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
							<fieldset className="form__fieldset form__fieldset_type_submit">
								<button className="form__button" type="submit">
									Save
								</button>
							</fieldset>
						</form>
					</PopupWithForm>

					<PopupWithForm
						name={"card"}
						title={"New place"}
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopUps}
					>
						<form className="form form_type_card" name="card-form" noValidate>
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
							<fieldset className="form__fieldset form__fieldset_type_submit">
								<button className="form__button" type="submit">
									Create
								</button>
							</fieldset>
						</form>
					</PopupWithForm>
					<PopupWithForm
						name={"avatar"}
						title={"Update profile picture"}
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopUps}
					>
						<form className="form form_type_avatar" name="avatar-form" noValidate>
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
							<fieldset className="form__fieldset form__fieldset_type_submit">
								<button className="form__button" type="submit">
									Save
								</button>
							</fieldset>
						</form>
					</PopupWithForm>
					<PopupWithForm
						name={"delete"}
						title={"Are you sure?"}
						onClose={closeAllPopUps}
					>
						<form className="form form_type_delete" name="delete-form" novalidate>
							<fieldset className="form__fieldset form__fieldset_type_submit">
								<button className="form__button" type="submit">
									Yes
								</button>
							</fieldset>
						</form>
					</PopupWithForm>
					<PopupWithImage
						onClose={closeAllPopUps}
						isOpen={isImagePopupOpen}
						selectedCard={selectedCard}
					></PopupWithImage>
				</section>
				<Footer />
			</div>
		</div>
	);
}

export default App;
