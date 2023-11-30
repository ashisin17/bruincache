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


export default function App(props) {
  const [user, setUser] = useState(null);

  const glogin = async () => {
    const response = await signInWithGooglePopup();
    console.log(user);
  };

  const gunlogin = async () => {
    signOut(auth);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Router>
        {user && <Header user={user} />}
        {user ? (
          <Routes>
            <Route exact path="/" element={<Map user={user} />} />
            <Route path="/profile" element={<Profile user = {user}/>} />
            <Route path="/home" element={<Home />} />
            <Route exact path="/create" element={<Create user={user} />} />
          </Routes>
        ) : (
					<Login />
        )}
      </Router>
    </div>
  );

}
