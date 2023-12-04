import "./profile.css"; // some overlap from profile frontend
import ListResultItem from "./ListResultItem"
import { useRef, useEffect } from "react";
import { State, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"
import CachePopup from "./CachePopup"


const db = getFirestore(app);

const Search = () => {
    const [results, setResults] = useState([])
    async function search_owner(name) {
            const res = [];
            const q = query(collection(db, "caches"), where("owner", "==", name));
            const querySnapshot = await getDocs(q);
            //console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().name);
            res.push({id: doc.id, name: doc.data().name});
            });
            setResults(res);
		
  }
  async function search_id(id) {
		const res = [];
		const querySnapshot = doc(db, "caches", id);
		//console.log(querySnapshot);
		querySnapshot.forEach((doc) => {
		  // doc.data() is never undefined for query doc snapshots
		  //console.log(doc.id, " => ", doc.data().name);
		  res.push({id: doc.id, name: doc.data().name});
		});
		return (<>
		<ul>
		{results.length > 0 && results.map(results => (
			<ListResultItem res={results}/>
		))}
		</ul>
		</>)
		
  }

  return ( <>
		<div className='background-rectangle'></div>

    <div className='search'>
      <div className='search-text'>Search for Owner</div>

      <div className='search-options'>
        <label for="search_owner">Owner (email): 
          <input type="text" id="search_owner" />
        </label>
      </div>

      <button style={{marginTop: '10px', background:"#3AAFA9", fontSize:"20px", color:"#DEF2F1", width:"80px", fontFamily:"Istok Web", cursor:"pointer", borderRadius:"31.7699px"}} onClick={() => search_owner(document.getElementById("search_owner").value)}>Search</button>	
    </div>

    <div>
      <ul className="search-caches-text">
        {results.length > 0 &&
          results.map((result) => <ListResultItem res={result} key={result.id} />)}
      </ul>
    </div>
  </>
  )} 

export default Search;