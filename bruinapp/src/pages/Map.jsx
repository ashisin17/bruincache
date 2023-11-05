import { Wrapper } from "@googlemaps/react-wrapper";
import { useRef, useEffect } from "react";
import { State, useState } from "react";
import 'reactjs-popup/dist/index.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc } from 'firebase/firestore/lite';

const locations = [];

const firebaseConfig = {
  apiKey: "AIzaSyALtAMLyqRTezdUkyNXbsOCwxeME_piokQ",
  authDomain: "bruincache-1c406.firebaseapp.com",
  projectId: "bruincache-1c406",
  storageBucket: "bruincache-1c406.appspot.com",
  messagingSenderId: "1014750408853",
  appId: "1:1014750408853:web:3ccbfbf2f4ab3a5dbe6b9c",
  measurementId: "G-XPHRYSNR7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Map() {
  const [popup, setPopup] = useState(Array(locations.length).fill(false));

  function handlePopup(i) {
	  let nextPop = popup.slice();
	  nextPop[i] = true;
	  setPopup(nextPop);

  }
  function closePopup() {
	  setPopup(Array(locations.length).fill(false));
  }
  function listPopups() {
	  const rows = [];
		for (let i = 0; i < locations.length; i++) {
			if(popup[i] == true) {
				rows.push(<CachePopup closePopup={closePopup} location={locations[i]}/>);
				//alert(i);
				//alert(locations.length);
				//alert(locations[i].lat);
			}
		}
		return rows;
  }
  return (<>
  <div>
	<Wrapper apiKey={"AIzaSyCl4rT1OsaqKlRyTXY0lQuF0RFG1SXaYXY"}>
	<MyMapComponent center={{lat:34.07, lng:-118.445}} zoom={15} setpop={handlePopup}>
		</MyMapComponent>
	</Wrapper>
	{
		listPopups()
	}

  </div>
  </>)
}
function CachePopup(props) {
	return (<>
	<div style={{position:'absolute',
		top:'50%',
		left:'50%',
		width:'80%',  /* adjust as per your needs */
		height:'80%',   /* adjust as per your needs */
		marginLeft:'-40%',   /* negative half of width above */
		marginTop:'-20%',   /* negative half of height above */
		backgroundColor: 'white',}}>	
		<p> {props.location.lat.toString()}, {props.location.lng.toString()} </p>
		<button onClick={props.closePopup}>CLOSE</button>
	</div>
	</>)
}


function MyMapComponent({

  center,
  zoom,
  setpop,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef();
	const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    // Display the map
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
			locations.push({lat:parseFloat(doc.data().location.lat), lng:parseFloat(doc.data().location.lng)});
			console.log(locations);
		});
		for(let i = 0; i < locations.length; i++) {
			newMarker(locations[i], map, i);
			console.log(locations[i]);
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
  }, [ref, locations]);


  function newMarker(location, map, i) {
	var marker = new google.maps.Marker({
	  position: location, map:map, key:location
	});
	google.maps.event.addListener(marker, 'click', async function(evt) {
		//setIsOpen(true);
		//alert(marker.position);
		setpop(i);
		//alert(i);;
		
    })

	return marker;
	}
   async function send () {
	   //alert(document.getElementById("name").value);
		await addDoc(collection(db, "caches"), {
		  name: document.getElementById("name").value,
		  location: {lat:document.getElementById("lat").value, lng:document.getElementById("lng").value}
		});
  }
  return (<>
  <div style={{ height: '100vh', width: '100vw' }} ref={ref} id="map" >
  </div>
  <p>PROOF of CONCEPT ONLY, so you can see how to do it </p><br></br>
	<form>
	<p>Name:</p><input type="text" id="name"></input>
	<p>Latitude:</p><input type="text" id="lat"></input>
	<p>Longitude:</p><input type="text" id="lng"></input>
	</form>
	<button onClick={send}>SEND</button>
  </>)


}
