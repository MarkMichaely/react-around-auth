import { Link, Route } from "react-router-dom";
import logo from "../images/header_logo.svg";
export default function Header() {
	return (
		<header className="header">
			<img src={logo} alt="around the us" className="logo" />
			<Route path="/login">
				<Link className="header__link" to="/signup">
					Sign up
				</Link>
			</Route>
			<Route path="/signup">
				<Link className="header__link" to="/login">
					Log in
				</Link>
			</Route>
		</header>
	);
}
