import app from "../firebase"
import { getFirestore, collection, getDocs, addDoc, doc, query, where} from 'firebase/firestore';
import { getCountFromServer } from 'firebase/firestore';

import ReviewItem from "./ReviewItem"
import { State, useState } from "react";

const db = getFirestore(app);

function CachePopup(props) {
	const [reviews, setReviews] = useState([])
	const [loaded, setLoaded] = useState(false);
	const [count, setCount] = useState(0);
	async function get_reviews(id) {
		
		//setLoaded(true);
		const res = [];
		const q = query(collection(db, "reviews"), where("cache", "==", id));
		const querySnapshot = await getDocs(q);
		const countData = await getCountFromServer(q);
		console.log("MOVING MOBING");
		querySnapshot.forEach((doc) => {
		  // doc.data() is never undefined for query doc snapshots
		  //console.log(doc.id, " => ", doc.data().name);
		  console.log(doc.id);
		  res.push({id: doc.id, review: doc.data().review, owner: doc.data().review, rating: doc.data().rating});
		});
		setReviews(res);
		setCount(countData.data().count);
		setLoaded(true);
    }
	async function send_review () {
	   //don't use get element and input forms like this, do it through react
	   //I don't know how to do proper frontend, this is for backend testing only
	   
		await addDoc(collection(db, "reviews"), {
		  owner: document.getElementById("rev_owner").value,
		  rating: document.getElementById("rating").value,
		  review: document.getElementById("review").value,
		  cache: props.cache.id,
		});
		setLoaded(false);
	}
	if(!loaded) {
		get_reviews(props.cache.id);
	}
	if(loaded) {return(<>
	<div style={{position:'absolute',
		top:'50%',
		left:'50%',
		width:'80%',  /* adjust as per your needs */
		height:'80%',   /* adjust as per your needs */
		marginLeft:'-40%',   /* negative half of width above */
		marginTop:'-20%',   /* negative half of height above */
		backgroundColor: 'white',}}>	
		<div style={{display:'flex'}}>
		<div style={{width:'50%'}}>
		<p> {props.cache.data().location.lat.toString()}, {props.cache.data().location.lng.toString()} </p>
		<p>{ props.cache.data().name }</p>
		<p>{ props.cache.data().owner }</p>
		<p>{ props.cache.id }</p>
		<p>{ count } SOLVES </p>
		<button onClick={props.closePopup}>CLOSE</button>
		<ul>
		{reviews.length > 0 && reviews.map(reviews => (
			<ReviewItem res={reviews}/>
		))}
		</ul>
		</div>
		<form>CREATE NEW REVIEW
		<p>Rating 0-5:</p><input type="number" id="rating"></input>
		<p>Review (optional):</p><input type="text" id="review"></input>
		<p>Owner:</p><input type="text" id="rev_owner"></input>
		</form>
		<button onClick={send_review}>SEND</button>
		</div>
	</div>
	
	</>)
	}
	
	
} export default CachePopup;
