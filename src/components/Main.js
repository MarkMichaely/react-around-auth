import React from "react";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
export default function Main() {
	const [avatarClick, setAvatarClick] = React.useState(false);
	const [profileClick, setProfileClick] = React.useState(false);
	const [placeClick, setPlaceClick] = React.useState(false);

	const handleEditAvatarClick = (evt) => {
		// setAvatarClick(true);
		document.querySelector(".popup_type_avatar").classList.add("popup_opened");
	};

	const handleEditProfileClick = (evt) => {
		// setProfileClick(true);
		document.querySelector(".popup_type_edit").classList.add("popup_opened");
	};

	const handleAddPlaceClick = (evt) => {
		document.querySelector(".popup_type_card").classList.add("popup_opened");
		// setPlaceClick(true);
	};
	const handleCloseButton = (evt) => {};

	return (
		<main className="main">
			<section className="profile">
				<div className="profile__avatar">
					<img
						src={require("../images/edit_vector.svg").default}
						alt="pen icon"
						className="profile__avatar-edit-icon"
						onClick={handleEditAvatarClick}
					/>
				</div>
				<div className="profile-info">
					<div className="profile-info__wrapper">
						<h1 className="profile-info__name">Jacques Cousteau</h1>
						<button
							type="button"
							className="profile-info__btn"
							aria-label="edit button"
							onClick={handleEditProfileClick}
						>
							<img
								className="profile-info__edit-button"
								src={require("../images/Edit_Button.svg").default}
								alt="edit-button"
							/>
						</button>
					</div>
					<p className="profile-info__description">Explorer</p>
				</div>
				<button className="profile__add-btn" aria-label="add button" type="button">
					<img
						className="profile__add-sign"
						src={require("../images/add_Vector.svg").default}
						alt="add-button"
						onClick={handleAddPlaceClick}
					/>
				</button>
			</section>
			<section className="popups">
				<PopupWithForm name={"edit"} title={"Edit Form"} />
				<PopupWithForm name={"card"} title={"New place"} />
				<PopupWithForm name={"avatar"} title={"Update profile picture"} />
				<PopupWithForm name={"delete"} title={"Are you sure?"} />
				<PopupWithImage />
			</section>

			<section className="elements"></section>
		</main>
	);
}
