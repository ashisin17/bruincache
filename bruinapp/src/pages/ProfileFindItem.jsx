import { getFirestore, collection, getDoc, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"
import { State, useState } from "react";
const db = getFirestore(app);



function ProfileFindItem(props) {
	//console.log(props);
	const [loaded, setLoaded] = useState(false);
	const [cacheName, setCacheName] = useState("");
	async function search_id() {
		const res = [];
		const query = doc(db, "caches", props.res.data().cache);
		const docSnap = await getDoc(query);
		//console.log(querySnapshot);
		setCacheName(docSnap.data().name);
		//console.log(docSnap);

	}
	if(!loaded) {
		setLoaded(true);
		search_id();
	}
  
    return (
		
        <li key={props.res.id}>
            <h3>{cacheName} | {props.res.data().rating} | {props.res.data().review}</h3> 
        </li>
    )
} export default ProfileFindItem;