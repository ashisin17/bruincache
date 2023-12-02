function ProfileResultItem(props) {
	//console.log(props);
    return (
        <li key={props.res.id}>
            <h3>{props.res.data().name}</h3> 
        </li>
    )
} export default ProfileResultItem;