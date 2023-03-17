import React from "react";
import { Link } from "react-router-dom";


function Login({ isLoggedIn, children, ...props }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        // props.onUpdateUser({ name, about: password });
    }

    return (
        <div className={"auth"}>
            <h2 className="auth__title">Log in</h2>
            <form
                onSubmit={props.onSubmit}
                className={`auth__form`}
            >
                <fieldset className="auth__fieldset">
                    <input
                        type="email"
                        id="name"
                        name="email"
                        className="auth__input"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </fieldset>
                <fieldset className="auth__fieldset">
                    <input
                        type="password"
                        id="name"
                        name="password"
                        className="auth__input"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </fieldset>
                <fieldset className="auth__fieldset auth__fieldset_type_submit">
                    <button className="auth__button" type="submit">
                        {props.buttonText}
                    </button>
                </fieldset>
            </form>
            <p className="auth__footer">
                <Link to='/signup' className="auth__link">  Not a member yet? Sign up here!
                </Link>
            </p>
        </div>
    );
}

export default Login;