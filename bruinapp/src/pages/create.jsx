import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"

const db = getFirestore(app);


function Create() {
	
	async function send () {
	   //don't use get element and input forms like this, do it through react
	   //I don't know how to do proper frontend, this is for backend testing only
		await addDoc(collection(db, "caches"), {
		  name: document.getElementById("name").value,
		  location: {lat:document.getElementById("lat").value, lng:document.getElementById("lng").value},
		  owner: document.getElementById("owner").value,
		  desc: document.getElementById("desc").value,
		  solves: 0,
		  ratings: 0,
		  rating: 0,
		});
  }
  
return (<>
	<p>PROOF of CONCEPT ONLY, so you can see how to do it. Make this secure and good and move it away <br/>
	Just want you to see how the send function works </p><br></br>
	<form>CREATE NEW CACHE
	<p>Name:</p><input type="text" id="name"></input>
	<p>Latitude:</p><input type="text" id="lat"></input>
	<p>Longitude:</p><input type="text" id="lng"></input>
	<p>Owner:</p><input type="text" id="owner"></input>
	<p>Description:</p><input type="text" id="desc"></input>

	</form>
<button onClick={send}>SEND</button>
</>)
} export default Create;