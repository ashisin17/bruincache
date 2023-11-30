import React, { useEffect } from 'react';
import './login.css';
import app from "../firebase";
import { signInWithGooglePopup } from '../firebase';
//import './login-Button.css';
import LoginIcon from './pictures/LoginSVG.svg'; // Update the path

const Login = () => {
  const glogin = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  }

  useEffect(() => {
    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add('overlay-container');

    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    overlayContent.innerHTML = `
        <h2 class ="Welcome" >Welcome to</h2>
        <p class="BruinCache"> Bruin Cache </p>
        <p class="Description"> A new way to explore the UCLA Campus </p>
    `;

    overlayContainer.appendChild(overlayContent);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const loginButton = document.createElement('button');
    loginButton.classList.add('login-button');

    // Create an image element for the SVG
    const svgImage = new Image();
    svgImage.src = LoginIcon;
    svgImage.alt = 'Login';

    loginButton.appendChild(svgImage);
    loginButton.addEventListener('click', glogin);

    buttonContainer.appendChild(loginButton);
    overlayContainer.appendChild(buttonContainer);

    document.body.appendChild(overlayContainer);

    overlayContainer.style.display = 'flex';
    overlayContainer.style.flexDirection = 'column';
    overlayContainer.style.alignItems = 'center';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeChild(overlayContainer);
    };
  }, []);

  return null;
};

export default Login;
