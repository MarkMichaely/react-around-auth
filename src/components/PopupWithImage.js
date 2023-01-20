export default function PopupWithImage() {
	return (
		<div className="popup popup_type_image">
			<div className="popup__image-wrapper">
				<button
					type="button"
					className="popup__close-btn popup__close-btn_type_image"
				>
					<img
						src={require("../images/Close_Icon.svg").default}
						alt="close sign"
						className="popup__close-sign popup__close-sign_type_image"
					/>
				</button>
				<img alt="Location Image" className="popup__card-image" />
				<h2 className="popup__card-title"></h2>
			</div>
		</div>
	);
}
