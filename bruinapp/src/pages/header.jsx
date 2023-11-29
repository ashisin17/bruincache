import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {auth} from '../firebase'
import {signOut } from 'firebase/auth';


const Header = ( {user} ) => {
  const location = useLocation();
  const gunlogin = async () => {
			signOut(auth)
		}
  const headerStyle = {
    backgroundColor: 'black',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    height: '5vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this to align items at the ends of the container
    lineHeight: '1.5', // Increase line height to ensure text visibility
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  if (location.pathname !== '/login') {
    return (
      <div style={headerStyle}>
        <h1>UCLA Bruin App</h1>
		<p>{user.email}</p>
		<button style={buttonStyle} onClick={gunlogin}>Logout</button>
        <button style={buttonStyle}>Your Button</button>
      </div>
    );
  }
};

export default Header;