import { Wrapper } from "@googlemaps/react-wrapper";
import { useRef, useEffect } from "react";
import { State, useState } from "react";
import 'reactjs-popup/dist/index.css';
const locations = [{lat:34.07, lng:-118.445},{lat:34.08, lng:-118.445}];

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

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
      });
		//const { AdvancedMarkerElement } = google.maps.importLibrary("marker");
	for(let i = 0; i < locations.length; i++) {
		newMarker(locations[i], map, i);
	}
  // Displays single markers on map when called
      //addSingleMarkers({ locations, map });
    }
  }, [ref, locations]);


  function newMarker(location, map, i) {
	var marker = new google.maps.Marker({
	  position: location, map:map, key:location
	});
	google.maps.event.addListener(marker, 'click', function(evt) {
		//setIsOpen(true);
		//alert(marker.position);
		setpop(i);
		//alert(i);;
    })

	return marker;
}
  return (<>
  <div style={{ height: '100vh', width: '100vw' }} ref={ref} id="map" >
  </div>
  </>)


}
