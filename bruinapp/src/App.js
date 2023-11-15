import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./pages/profile.js"; 
import Map from "./pages/Map"
import "./App.css";

export default function App () {
	return (
		<Router>
			{/* Set up header component here if not header.tsx */}
			<Routes>
				<Route exact path="/" Component={Map} /> {/* replaced element with component for it to work :(( */}
				<Route path="/profile" Component={Profile} /> {/**Just add route to ur pgs */}
			</Routes>
		</Router>
		)
}
