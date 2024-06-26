import ListResultItem from "./ListResultItem"
import { useRef, useEffect } from "react";
import { State, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"
import CachePopup from "./CachePopup"


const db = getFirestore(app);

const caches = [];

function GMapComponent({

  center,
  zoom,
  user,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
	
	const [popup, setPopup] = useState(Array(caches.length).fill(false));

  function handlePopup(i) {
	  let nextPop = popup.slice();
	  nextPop[i] = true;
	  setPopup(nextPop);

  }
  function closePopup() {
	  setPopup(Array(caches.length).fill(false));
  }
  function listPopups() {
	  const rows = [];
		for (let i = 0; i < caches.length; i++) {
			if(popup[i] == true) {
				
				rows.push(<CachePopup user={user} cache = {caches[i]} closePopup={closePopup}/>);
				//alert(i);
				//alert(locations.length);
				//alert(locations[i].lat);
			}
		}
		return rows;
  }
	
  const ref = useRef();
	const [loaded, setLoaded] = useState(0);
	const [results, setResults] = useState([])
  useEffect(() => {
    // Display the map
	//console.log(user);
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
      });
	async function loadMarkers() {
		setLoaded(true);
		const querySnapshot = await getDocs(collection(db, "caches"));
		//console.log(querySnapshot);
		querySnapshot.forEach((doc) => {
			caches.push(doc);
			//console.log(locations);
		});
		for(let i = 0; i < caches.length; i++) {
			newMarker({lat:parseFloat(caches[i].data().location.lat), lng:parseFloat(caches[i].data().location.lng)}, map, i);
			//console.log(locations[i]);
		}
	}
	if(loaded != true) {
		setLoaded(true);
		loadMarkers();
	}
	
		//const { AdvancedMarkerElement } = google.maps.importLibrary("marker");
	
  // Displays single markers on map when called
      //addSingleMarkers({ locations, map });
    }
  }, [ref, caches]);


  function newMarker(location, map, i) {
	var marker = new google.maps.Marker({
	  position: location, map:map, key:location
	});
	google.maps.event.addListener(marker, 'click', async function(evt) {
		//setIsOpen(true);
		//alert(marker.position);
		handlePopup(i);
		//alert(i);;
		
    })

	return marker;
	}
   
  
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
  return (<>
  <div style={{ height: '94vh', width: '100vw' }} ref={ref} id="map" >
  </div>
  	{
		listPopups()
	}
	

		
	
	
  </>)


} export default GMapComponent;