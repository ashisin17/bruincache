import app from "../firebase"
import { getFirestore, collection, getDocs, addDoc, doc, query, where} from 'firebase/firestore';
import { getCountFromServer } from 'firebase/firestore';

import ReviewItem from "./ReviewItem"
import { State, useState } from "react";

import "./cache.css";

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
		  owner: props.user.email,
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
	
	<div className = "bg">	
		<div style={{display:'flex'}}>
		<div style={{width:'50%'}}>
		<button className="back-button" onClick={props.closePopup}>
			<svg width="59" height="33" viewBox="0 0 59 33" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5831 15.6719L17.8475 22.1975C18.1192 22.4249 18.3372 22.6992 18.4883 23.004C18.6395 23.3087 18.7208 23.6377 18.7273 23.9713C18.7339 24.3048 18.6655 24.6362 18.5265 24.9455C18.3874 25.2549 18.1803 25.5359 17.9177 25.7718C17.6551 26.0077 17.3423 26.1937 16.9979 26.3187C16.6535 26.4436 16.2847 26.505 15.9133 26.4991C15.542 26.4932 15.1758 26.4202 14.8365 26.2844C14.4973 26.1486 14.1919 25.9528 13.9388 25.7087L1.95437 14.9431L0 13.1875L1.95437 11.4319L13.9388 0.666245C14.463 0.227405 15.1564 -0.011503 15.8729 -0.000147002C16.5894 0.011209 17.273 0.271942 17.7797 0.727123C18.2864 1.1823 18.5767 1.79639 18.5893 2.44001C18.602 3.08364 18.336 3.70654 17.8475 4.1775L10.5831 10.7031H47.0156C50.1941 10.7031 53.2424 11.8374 55.4899 13.8563C57.7374 15.8752 59 18.6135 59 21.4687C59 24.324 57.7374 27.0622 55.4899 29.0812C53.2424 31.1001 50.1941 32.2344 47.0156 32.2344H39.6406C38.9071 32.2344 38.2037 31.9726 37.685 31.5067C37.1664 31.0408 36.875 30.4089 36.875 29.75C36.875 29.0911 37.1664 28.4592 37.685 27.9933C38.2037 27.5274 38.9071 27.2656 39.6406 27.2656H47.0156C48.7271 27.2656 50.3685 26.6549 51.5787 25.5678C52.7889 24.4806 53.4688 23.0062 53.4688 21.4687C53.4688 19.9313 52.7889 18.4569 51.5787 17.3697C50.3685 16.2826 48.7271 15.6719 47.0156 15.6719H10.5831Z" fill="#2B7A78"/>
			</svg>
		</button>

		
		<h1>{ props.cache.data().name }</h1>
		
		<p> {props.cache.data().location.lat.toString()}, {props.cache.data().location.lng.toString()} </p>
		<p>{ props.cache.data().owner }</p>
		
		<p>{ props.cache.data().desc }</p>
		<p>{ count } SOLVES </p>
		
		<div className = "reviews-bg">
			<h2 className="review-title">Reviews:</h2>
			<ul>
			{reviews.length > 0 && reviews.map(reviews => (
				<ReviewItem res={reviews}/>
			))}
			</ul>
		</div>
		
		</div>
			<div className= "submit-review-bg">
				<form>
				<p>Rating 0-5:   <input type="number" id="rating"></input>
				Review (optional):<input type="text" id="review"></input></p>
				</form>
				<button onClick={send_review}>SEND</button>
			</div>
		</div>
	</div>
	
	</>)
	}
	
	
} export default CachePopup;
