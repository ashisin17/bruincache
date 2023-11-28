import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"
import { useNavigate } from "react-router-dom";
const db = getFirestore(app);


function Create( props ) {
	const navigate = useNavigate();
	async function send () {
		console.log(props.user)
	   //don't use get element and input forms like this, do it through react
	   //I don't know how to do proper frontend, this is for backend testing only
	   if(!document.getElementById("desc").value || ((Number(document.getElementById("lat").value)) === 0 && !document.getElementById("lat").value) || ((Number(document.getElementById("lng").value)) === 0 && !document.getElementById("lat").value)|| !document.getElementById("name").value) {
		   alert("Please fill out all forms");
		   console.log(document.getElementById("name").value);
		   console.log(Number(document.getElementById("lat").value));
		   console.log(typeof document.getElementById("lng").value);
		   console.log(document.getElementById("desc").value);
		   
		   return;
	   }
		await addDoc(collection(db, "caches"), {
		  name: document.getElementById("name").value,
		  location: {lat:document.getElementById("lat").value, lng:document.getElementById("lng").value},
		  owner: props.user.email,
		  desc: document.getElementById("desc").value,
		  solves: 0,
		  ratings: 0,
		  rating: 0,
		});
		
		navigate('/');
  }
  
return (<>
	<p>PROOF of CONCEPT ONLY, so you can see how to do it. Make this secure and good and move it away <br/>
	Just want you to see how the send function works </p><br></br>
	<form>CREATE NEW CACHE
	<p> {props.user.email} </p>
	<p>Cache Name:</p><input type="text" id="name" required></input>
	<p>Latitude (decimal):</p><input type="text" id="lat" required></input>
	<p>Longitude (decimal):</p><input type="text" id="lng" required></input>
	<p>Cache Description:</p><textarea  type="text" id="desc" required></textarea>

	</form>
<button onClick={send}>SEND</button>
</>)
} export default Create;