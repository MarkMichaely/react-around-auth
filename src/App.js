import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
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
				<Header />
				<Main />
				<Footer />
			</div>
		</div>
	);
}

export default App;
