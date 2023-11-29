import { Wrapper } from "@googlemaps/react-wrapper";

import 'reactjs-popup/dist/index.css';

import { initializeApp } from 'firebase/app';
import GMapComponent from "./GMapComponent"



// Initialize Firebase


export default function Map(props) {
  
  return (<>
  <div>
    <Wrapper apiKey={"AIzaSyCl4rT1OsaqKlRyTXY0lQuF0RFG1SXaYXY"}>
      <GMapComponent user={props.user} center={{lat:34.07, lng:-118.445}} zoom={15}>
        </GMapComponent>
    </Wrapper>
  </div>
  </>)
}





