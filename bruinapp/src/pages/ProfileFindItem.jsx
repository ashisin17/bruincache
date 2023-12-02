import { getFirestore, collection, getDoc, addDoc, doc, query, where, deleteDoc} from 'firebase/firestore/lite';
import app from "../firebase"
import { State, useState } from "react";
const db = getFirestore(app);



function ProfileFindItem(props) {
	const [loaded, setLoaded] = useState(false);
	const [cacheName, setCacheName] = useState("");
	const [stupid, setStupid] = useState(true);
	async function deleteFind(review) {
		await deleteDoc(doc(db, "reviews", review));
		window.location.reload(false);
	}
	async function search_id() {
		const res = [];
		const query = doc(db, "caches", props.res.data().cache);
		const docSnap = await getDoc(query);
		setCacheName(docSnap.data().name);
	}
	if(!loaded) {
		setLoaded(true);
		search_id();
	}

	/* Format is different if there is a review or not */
	if(props.res.data().review == '') {
		return (
			<li key={props.res.id}>
				<h3>{cacheName} | {props.res.data().rating}</h3> 
				<button style={{background:"#3AAFA9", fontSize:"20px", color:"#DEF2F1", width:"80px", fontFamily:"Istok Web", cursor:"pointer", borderRadius:"31.7699px"}} key={props.res.id} onClick={() => deleteFind(props.res.id)}>Delete</button>
			</li>
		)
	}
	else {
		return (
			<li key={props.res.id}>
				<h3>{cacheName} | {props.res.data().rating} | {props.res.data().review}</h3> 
				<button style={{background:"#3AAFA9", fontSize:"20px", color:"#DEF2F1", width:"80px", fontFamily:"Istok Web", cursor:"pointer", borderRadius:"31.7699px"}} key={props.res.id} onClick={() => deleteFind(props.res.id)}>Delete</button>
			</li>
		)		
	}
} export default ProfileFindItem;