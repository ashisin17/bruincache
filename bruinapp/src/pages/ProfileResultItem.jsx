import { getFirestore, collection, getDoc, addDoc, doc, query, where, deleteDoc} from 'firebase/firestore/lite';
import app from "../firebase"
import { State, useState } from "react";
const db = getFirestore(app);

function ProfileResultItem(props) {
	//console.log(props);
	async function deleteFind(cache) {
		await deleteDoc(doc(db, "caches", cache));
		window.location.reload(false);
	}
    return (
        <li key={props.res.id}>
            <h3>{props.res.data().name}</h3> <button onClick={() => deleteFind(props.res.id)} />
        </li>
    )
} export default ProfileResultItem;