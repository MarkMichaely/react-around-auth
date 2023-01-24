import React from "react";
import api from "../utils/api";
import Card from "./Card";
import editVector from "../images/edit_vector.svg";
import editButton from "../images/Edit_Button.svg";
import addVector from "../images/add_Vector.svg";

export default function Main(props) {
	const [userName, setUserName] = React.useState("");
	const [userDescription, setUserDescription] = React.useState("");
	const [userAvatar, setUserAvatar] = React.useState("");
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api
			.getUserInfo()
			.then((res) => {
				setUserName(res.name);
				setUserDescription(res.about);
				setUserAvatar(res.avatar);
			})
			.catch((err) => console.log(err));
	}, []);

	React.useEffect(() => {
		api
			.getInitialCards()
			.then((res) => {
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
						src={editVector}
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
								src={editButton}
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
					<img className="profile__add-sign" src={addVector} alt="add-button" />
				</button>
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
