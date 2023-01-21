import React from "react";
import api from "../utils/api";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
export default function Main(props) {
	const [userName, SetUserName] = React.useState("");
	const [userDescription, SetUserDescription] = React.useState("");
	const [userAvatar, SetUserAvatar] = React.useState("");
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api
			.getUserInfo()
			.then((res) => {
				SetUserName(res.name);
				SetUserDescription(res.about);
				SetUserAvatar(res.avatar);
			})
			.catch((err) => console.log(err));
	}, []);

	React.useEffect(() => {
		api
			.getInitialCards()
			.then((res) => {
				setCards([]);
				setCards(res);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<main className="main">
			<section className="profile">
				<div
					className="profile__avatar"
					onClick={props.onEditAvatarClick}
					style={{ backgroundImage: `url(${userAvatar})` }}
				>
					<img
						src={require("../images/edit_vector.svg").default}
						alt="pen icon"
						className="profile__avatar-edit-icon"
					/>
				</div>
				<div className="profile-info">
					<div className="profile-info__wrapper">
						<h1 className="profile-info__name">{userName}</h1>
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
					<p className="profile-info__description">{userDescription}</p>
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
				<PopupWithForm
					name={"delete"}
					title={"Are you sure?"}
					onClose={props.onClose}
				/>
				<PopupWithImage
					onClose={props.onClose}
					isOpen={props.isImagePopupOpen}
					selectedCard={props.selectedCard}
				/>
			</section>

			<section className="elements">
				{cards.map((card) => {
					return (
						<Card
							key={card._id}
							card={card}
							name={card.name}
							link={card.link}
							likes={card.likes.length}
							onCardClick={props.onCardClick}
						/>
					);
				})}
			</section>
		</main>
	);
}
