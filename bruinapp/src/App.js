import  Map  from "./pages/Map";
import React from 'react';
import Header from './pages/header';
import Login from './pages/login';
import Search from './pages/search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App () {
	return (
		<Router>
		<div>
			<div>
			<Header />

				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			
			</div>

			<Map />
		</div>
		</Router>
		);
};
