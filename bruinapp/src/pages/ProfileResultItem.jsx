import { getFirestore, collection, getDoc, addDoc, doc, query, where, deleteDoc} from 'firebase/firestore/lite';
import app from "../firebase"
import { State, useState } from "react";
const db = getFirestore(app);

function ProfileResultItem(props) {
	async function deleteFind(cache) {
		await deleteDoc(doc(db, "caches", cache));
		window.location.reload(false);
	}
    return (
        <li key={props.res.id}>
            <h3>{props.res.data().name}</h3> 
            <button style={{background:"#3AAFA9", fontSize:"20px", color:"#DEF2F1", width:"80px", fontFamily:"Istok Web", cursor:"pointer", borderRadius:"31.7699px"}} key={props.res.id} onClick={() => deleteFind(props.res.id)}>Delete</button>
        </li>
    )
} export default ProfileResultItem;