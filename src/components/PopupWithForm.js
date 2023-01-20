export default function PopupWithForm(props) {
	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.isOpen ? "popup_opened" : ""
			} `}
		>
			<div className="popup__box">
				<div className="popup__header">
					<h2 className="popup__title">{props.title}</h2>
					<button
						className={`popup__close-btn popup__close-btn_type_${props.name}`}
						type="button"
						onClick={props.onClose}
					>
						<img
							src={require("../images/Close_Icon.svg").default}
							alt="close button"
							className="popup__close-sign"
						/>
					</button>
				</div>
				{props.children}
			</div>
		</div>
	);
}
