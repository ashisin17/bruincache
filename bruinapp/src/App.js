import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./pages/profile.js"; 
import Map from "./pages/Map"
import Login from './pages/login';
import Header from './pages/header';
import "./App.css";

export default function App () {
	return (
		<Router>

			<Header />

			<Routes>
				<Route exact path="/" Component={Map} /> {/* replaced element with component for it to work :(( */}
				<Route path="/profile" Component={Profile} /> {/**Just add route to ur pgs */}
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
		)
}



