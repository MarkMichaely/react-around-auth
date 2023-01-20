import React from "react";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
export default function Main(props) {
	const handleCloseButton = (evt) => {};

	return (
		<main className="main">
			<section className="profile">
				<div className="profile__avatar" onClick={props.onEditAvatarClick}>
					<img
						src={require("../images/edit_vector.svg").default}
						alt="pen icon"
						className="profile__avatar-edit-icon"
					/>
				</div>
				<div className="profile-info">
					<div className="profile-info__wrapper">
						<h1 className="profile-info__name">Jacques Cousteau</h1>
						<button
							type="button"
							className="profile-info__btn"
							aria-label="edit button"
							onClick={props.onEditProfileClick}
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
				<button
					className="profile__add-btn"
					aria-label="add button"
					type="button"
					onClick={props.onAddPlaceClick}
				>
					<img
						className="profile__add-sign"
						src={require("../images/add_Vector.svg").default}
						alt="add-button"
					/>
				</button>
			</section>
			<section className="popups">
				<PopupWithForm
					name={"edit"}
					title={"Edit Form"}
					isOpen={props.isEditProfilePopupOpen}
					onClose={props.onClose}
				/>
				<PopupWithForm
					name={"card"}
					title={"New place"}
					isOpen={props.isAddPlacePopupOpen}
					onClose={props.onClose}
				/>
				<PopupWithForm
					name={"avatar"}
					title={"Update profile picture"}
					isOpen={props.isEditAvatarPopupOpen}
					onClose={props.onClose}
				/>
				<PopupWithForm name={"delete"} title={"Are you sure?"} />
				<PopupWithImage />
			</section>

			<section className="elements"></section>
		</main>
	);
}
