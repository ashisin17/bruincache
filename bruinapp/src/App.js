import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./pages/profile.js"; 
import Map from "./pages/Map"
import "./App.css";

export default function App () {
	return (
		<Router>
			{/* Set up your navigation or header component here if needed */}
			<Routes>
				<Route exact path="/" element={Map} />
				<Route path="/profile" element={Profile} /> {/**Just add route to ur pgs */}
			</Routes>
		</Router>
		)
}
