import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import './login.css';
import app from "../firebase";
import { signInWithGooglePopup } from '../firebase';
//import './login-Button.css';
import LoginIcon from './pictures/LoginPNG.png'; // Update the path

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

    const svgImage = new Image();
    svgImage.src = LoginIcon;
    svgImage.alt = 'Login';
    svgImage.classList.add('google-icon'); 

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
      // <Google onClick={signInWithPopup}/>
    };
  }, []);

  return null;
};

export default Login;

/** PAST authentication for reference :)
 *   const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (result) => {
        if (result) {

          const {displayName, email} = result
          setUserData({ displayName, email })
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }

      })

      return () => unsubscribe();
    },[])

    const Logout = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        setUserData({})
        setIsLoggedIn(false)
      }).catch((error) => {
        // An error happened.
        console.log({ error });
      });
    }  


  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        // signed-in user info.
        const user = result.user;
        const email = result.user.email; 
        const name = result.user.name;

        //FOR TEST PURPOSES
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
  
        // connect to users collection.
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid); // 'users' is the Firestore collection
  
        const userData = {
          email: user.email, // Update the email field
          year: user.year, // Update the year 
        };
  
        setDoc(userRef, userData, { merge: true })
          .then(() => {
            navigate("/account");
          })
          .catch((error) => {
            console.error("Error writing user data to Firestore: ", error);
          });
  
      })
      .catch((error) => {
        console.error("Google sign-in error: ", error);
      });
  };

*/