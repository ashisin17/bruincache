import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./pages/profile.js"; 
import Map from "./pages/Map"
import app from "./firebase"
import {signInWithGooglePopup} from './firebase';
import {auth} from './firebase'
import Login from './pages/login';
import Header from './pages/header';
import Create from './pages/create';
import Home from './pages/home';
import { useState, useEffect } from 'react';
import {signOut } from 'firebase/auth';

import "./App.css";

export default function App () {
	const [user, setUser] = useState(null);
	const glogin = async () => {
			const response = await signInWithGooglePopup();
			
			console.log(user)
		}
	const gunlogin = async () => {
			signOut(auth)
		}
	useEffect(() => {
		auth.onAuthStateChanged(user => {
		  setUser(user);
		  			console.log(user)

		})
	}, [])
	if(user) {
		return (
			<>
			<button style={{width:50, height:50}} onClick={gunlogin}>LOGOUT</button>
			<Router>

			<Header />

			<Routes>
				<Route exact path="/" Component={Map} />
				<Route path="/profile" Component={Profile} /> 
				<Route path="/home" Component={Home} />

				<Route path="/login" Component={Login} />
				<Route path="/create" element={<Create />} />
			</Routes>
			</Router>
			
			</>
		)
	}
	else {
	    return (
			<>
			<button style={{width:50, height:50}} onClick={glogin}>LOGIN</button>
			
			<Home user={user} />
			</>
			
		)
	}
}



