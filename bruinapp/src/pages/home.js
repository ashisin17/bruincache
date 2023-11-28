import React from 'react'
import app from "../firebase"
import {signInWithGooglePopup} from '../firebase'


const Home = ({user }) => {
	
    return (
	<p>{user?user.email:0}</p>
		//<button style={{width:50, height:50}} onClick={glogin}></button>
      //document.body.style.overflow = 'auto';
      //document.body.removeChild(overlayContainer);
    );
}
export default Home;