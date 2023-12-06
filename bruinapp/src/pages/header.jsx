import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconSVG from './pictures/IconSVG.svg';
import {auth} from '../firebase'
import {signOut } from 'firebase/auth';
import MapSVG from './pictures/MapSVG.svg';
import BruinPNG from './pictures/BruinCacheLogo.png';
import LogoutSVG from './pictures/LogoutSVG.svg';
import CreateSVG from './pictures/CreateSVG.svg';
import SearchSVG from './pictures/SearchSVG.svg';



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
    marginLeft: '10px', 
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

  const LogoutButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    backgroundImage: `url(${LogoutSVG})`,
    backgroundSize: 'cover',
    width: '55px',
    height: '55px',
    padding: '0',
  }

  const CreateButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    backgroundImage: `url(${CreateSVG})`,
    backgroundSize: 'cover',
    width: '55px',
    height: '55px',
    padding: '0',
  }
  const SearchButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    backgroundImage: `url(${SearchSVG})`,
    backgroundSize: 'cover',
    width: '55px',
    height: '55px',
    padding: '0',
  }



  if (location.pathname !== '/login') {
    return (
      <div style={headerStyle}>
    <Link to="/">
          <img src={BruinPNG} alt="BruinCache" style={{ height: '50px' }} />
      </Link>
        <div style={buttonContainerStyle}>
      <Link to="/create">
        <button style={CreateButtonStyle} />
      </Link>
      <Link to="/search">
        <button style={SearchButtonStyle}/>
      </Link>
      <Link to="/profile">
        <button style={IconButtonStyle} />
      </Link>
      <Link to="/">
        <button style={MapButtonStyle} />
      </Link>
          <button style={LogoutButtonStyle} onClick={gunlogin}></button>
        </div>

 		  

      </div>
    );
  }
};

export default Header;