import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import './login.css';
import Google from './Google.js'

const Login = () => {
  const handleGoogleSignin = async() => {
    // google authentication stuff
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });  
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  useEffect(() => {
    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add('overlay-container');

    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    overlayContent.innerHTML = `
        <h2 class ="Welcome" >Welcome to</h2>
        <p class="BruinCache"> BruinCache </p>
        <p class="Description"> A new way to explore the UCLA Campus </p>


    `;
    // Disable scroll when the overlay is displayed
    
  

    overlayContainer.appendChild(overlayContent);
    document.body.appendChild(overlayContainer);

    overlayContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeChild(overlayContainer);
      <Google onClick={signInWithPopup}/>
    };
  }, []);

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