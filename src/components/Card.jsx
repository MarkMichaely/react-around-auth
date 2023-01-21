export default function Card(props) {
	function handleClick() {
		props.onCardClick(props.card);
	}

	return (
		<article className="card">
			<img
				alt={props.name}
				src={props.link}
				className="card__image"
				onClick={handleClick}
			/>
			<button className="card__delete-btn" type="button"></button>
			<div className="card__title-wrapper">
				<h2 className="card__title">{props.name}</h2>
				<div className="card__like-btn-wrapper">
					<button className="card__like-btn" type="button"></button>
					<h3 className="card__like-btn-counter">{props.likes}</h3>
				</div>
			</div>
		</article>
	);
}
