import "./profile.css"; // some overlap with profile front end
import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"
import { useNavigate } from "react-router-dom";
const db = getFirestore(app);



function Create( props ) {
	const navigate = useNavigate();
	async function send () {
		console.log(props.user)
	   //don't use get element and input forms like this, do it through react
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
		<div className='background-rectangle'></div>

		<div className='create'>
			<div className='create-text'>Create Cache</div>

			<div className='create-options'>
				<label for="name">Cache Name: 
					<input type="text" id="name" required />
				</label>
				<label for="lat">Latitude (decimal):
					<input type="text" id="lat" required />
				</label>
				<label for="lng">Longitude (decimal):
					<input type="text" id="lng" required/>
				</label>
				<label for="desc">Cache Description:
					<input type="text" id="desc" required/>
				</label>
			</div>

			<button style={{marginTop: '10px', background:"#3AAFA9", fontSize:"20px", color:"#DEF2F1", width:"80px", fontFamily:"Istok Web", cursor:"pointer", borderRadius:"31.7699px"}} onClick={send}>Send</button>	
		</div>
	</>)
} export default Create;