import logo from "./images/header_logo.svg";

function App() {
	return (
		// <div className="App">
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo" />
		//     <p>
		//       Edit <code>src/App.js</code> and save to reload.
		//     </p>
		//     <a
		//       className="App-link"
		//       href="https://reactjs.org"
		//       target="_blank"
		//       rel="noopener noreferrer"
		//     >
		//       Learn React
		//     </a>
		//   </header>
		// </div>
		<div className="body">
			<div className="page">
				<header className="header">
					<img src={logo} alt="around the us" className="logo" />
				</header>
				<main className="main">
					<section className="profile">
						<div className="profile__avatar">
							<img
								src={require("./images/edit_vector.svg").default}
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
								>
									<img
										className="profile-info__edit-button"
										src={require("./images/Edit_Button.svg").default}
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
						>
							<img
								className="profile__add-sign"
								src={require("./images/add_Vector.svg").default}
								alt="add-button"
							/>
						</button>
					</section>
					<section className="popups">
						<div className="popup popup_type_edit">
							<div className="popup__box">
								<div className="popup__header">
									<h2 className="popup__title">Edit profile</h2>
									<button
										className="popup__close-btn popup__close-btn_type_edit"
										type="button"
									>
										<img
											src={require("./images/Close_Icon.svg").default}
											alt="close button"
											className="popup__close-sign"
										/>
									</button>
								</div>
								<form className="form form_type_edit" name="edit-form" novalidate>
									<fieldset className="form__fieldset">
										<input
											type="text"
											id="name"
											name="name"
											className="form__input form__input_type_name"
											placeholder="Name Surname"
											required
											maxlength="40"
											minlength="2"
										/>
										<span className="form__input-error name-error"></span>
									</fieldset>
									<fieldset className="form__fieldset">
										<input
											type="text"
											id="description"
											name="description"
											className="form__input form__input_type_description"
											placeholder="description"
											required
											maxlength="200"
											minlength="2"
										/>
										<span className="form__input-error description-error"></span>
									</fieldset>
									<fieldset className="form__fieldset form__fieldset_type_submit">
										<button className="form__button" type="submit">
											Save
										</button>
									</fieldset>
								</form>
							</div>
						</div>
						<div className="popup popup_type_card">
							<div className="popup__box">
								<div className="popup__header">
									<h2 className="popup__title">New Place</h2>
									<button
										className="popup__close-btn popup__close-btn_type_card"
										type="button"
									>
										<img
											src={require("./images/Close_Icon.svg").default}
											alt="close button"
											className="popup__close-sign"
										/>
									</button>
								</div>

								<form className="form form_type_card" name="card-form" novalidate>
									<fieldset className="form__fieldset">
										<input
											type="text"
											id="place"
											name="place"
											className="form__input form__input_type_place"
											placeholder="Title"
											required
											maxlength="30"
											minlength="1"
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
							</div>
						</div>
						<div className="popup popup_type_image">
							<div className="popup__image-wrapper">
								<button
									type="button"
									className="popup__close-btn popup__close-btn_type_image"
								>
									<img
										src={require("./images/Close_Icon.svg").default}
										alt="close sign"
										className="popup__close-sign popup__close-sign_type_image"
									/>
								</button>
								<img alt="Location Image" className="popup__card-image" />
								<h2 className="popup__card-title"></h2>
							</div>
						</div>
						<div className="popup popup_type_delete">
							<div className="popup__box">
								<div className="popup__header">
									<h2 className="popup__title">Are you sure?</h2>
									<button
										className="popup__close-btn popup__close-btn_type_edit"
										type="button"
									>
										<img
											src={require("./images/Close_Icon.svg").default}
											alt="close button"
											className="popup__close-sign"
										/>
									</button>
								</div>
								<form className="form form_type_delete" name="delete-form" novalidate>
									<fieldset className="form__fieldset form__fieldset_type_submit">
										<button className="form__button" type="submit">
											Yes
										</button>
									</fieldset>
								</form>
							</div>
						</div>
						<div className="popup popup_type_avatar">
							<div className="popup__box">
								<div className="popup__header">
									<h2 className="popup__title">Change Profile Picture</h2>
									<button
										className="popup__close-btn popup__close-btn_type_card"
										type="button"
									>
										<img
											src={require("./images/Close_Icon.svg").default}
											alt="close button"
											className="popup__close-sign"
										/>
									</button>
								</div>

								<form className="form form_type_avatar" name="avatar-form" novalidate>
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
							</div>
						</div>
					</section>

					<section className="elements"></section>
				</main>
				<footer className="footer">
					<p className="footer__copyright">© 2022 Mark Michaely</p>
				</footer>
			</div>
		</div>
	);
}

export default App;
