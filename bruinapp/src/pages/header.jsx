import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const headerStyle = {
    backgroundColor: 'black',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    height: '5vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1.5', // Increase line height to ensure text visibility
  };
  if(location.pathname !== '/login'){
  return (
    <div style={headerStyle}>
      <h1>UCLA Bruin App</h1>
    </div>
  );
}
};

export default Header;