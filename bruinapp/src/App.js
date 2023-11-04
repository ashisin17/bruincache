import { Wrapper, AdvancedMarkerElement } from "@googlemaps/react-wrapper";
import { useRef, useEffect } from "react";

const App = () => (
  <div>
	<Wrapper apiKey={"AIzaSyCl4rT1OsaqKlRyTXY0lQuF0RFG1SXaYXY"}>
		<MyMapComponent center={{lat:34.07, lng:-118.445}} zoom={15}>
		<p center={{lat:34.07, lng:-118.445}} zoom={15}>add</p>
		</MyMapComponent>
	</Wrapper>
  </div>
)


export default App
const locations = [{lat:34.07, lng:-118.445},{lat:34.08, lng:-118.445}];
function MyMapComponent({

  center,
  zoom,
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
	var markers = locations.map(function(location, i) {

    var marker = new google.maps.Marker({
      position: location, map:map, key:location
    });
    google.maps.event.addListener(marker, 'click', function(evt) {
		alert(marker.position);
    })

    return marker;
  });
  // Displays single markers on map when called
      //addSingleMarkers({ locations, map });
    }
  }, [ref, locations]);

  return (<>
  <div style={{ height: '100vh', width: '100vw' }} ref={ref} id="map" />
  </>)
}

/*google.maps.Marker.addListener("click", () => {
	alert("AHH");
});*/
/*
export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) =>
  locations.map(
    position =>
      new google.maps.Marker({
        position,
        map,
      }),
  );
  */
function addSingleMarkers(locations,map ) {
	const { AdvancedMarkerElement } = google.maps.importLibrary("marker");
	const marker = new window.google.maps.AdvancedMarkerElement({map,locations});
};
  
  
  
  