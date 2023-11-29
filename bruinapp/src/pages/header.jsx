import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconSVG from './pictures/IconSVG.svg';
import MapSVG from './pictures/MapSVG.svg';
import BruinPNG from './pictures/BruinCacheLogo.png';
import {auth} from '../firebase'
import {signOut } from 'firebase/auth';



const Header = ( {user} ) => {
  const location = useLocation();
  const gunlogin = async () => {
			signOut(auth)
		}
  const headerStyle = {
    backgroundColor: '#3AAFA9',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    height: '6vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: '1.5',
  };

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    width: '100%', 
  };

  const IconButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    backgroundImage: `url(${IconSVG})`,
    backgroundSize: 'cover',
    width: '55px',
    height: '55px',
    padding: '0',
  };

  const MapButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    backgroundImage: `url(${MapSVG})`,
    backgroundSize: 'cover',
    width: '55px',
    height: '55px',
    padding: '0',
  };

  if (location.pathname !== '/login') {
    return (
      <div style={headerStyle}>

          <img src={BruinPNG} alt="BruinCache" style={{ height: '50px' }} />
        <div style={buttonContainerStyle}>
          <Link to="/profile">
            <button style={IconButtonStyle} />
          </Link>

          <Link to="/">
            <button style={MapButtonStyle} />
          </Link>
        </div>

//         <h1>UCLA Bruin App</h1>
// 		<p>{user.email}</p>
// 		<button style={buttonStyle} onClick={gunlogin}>Logout</button>
//         <button style={buttonStyle}>Your Button</button>

      </div>
    );
  }
};

export default Header;
