


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
		<p> {props.cache.data().location.lat.toString()}, {props.cache.data().location.lng.toString()} </p>
		<p>{ props.cache.data().name }</p>
		<p>{ props.cache.data().owner }</p>
		<button onClick={props.closePopup}>CLOSE</button>
	</div>
	
	</>)
} export default CachePopup;
