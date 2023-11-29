import React, { useEffect } from 'react';
import './login.css';
import app from "../firebase"
import {signInWithGooglePopup} from '../firebase'



const Login = () => {
	const glogin = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
  /*useEffect(() => {
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
    document.body.appendChild(overlayContainer);

    overlayContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';


    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeChild(overlayContainer);
    };
  }, []);*/
	return (
		<button style={{width:50, height:50}} onClick={glogin}></button>
      //document.body.style.overflow = 'auto';
      //document.body.removeChild(overlayContainer);
    );
};

export default Login;
