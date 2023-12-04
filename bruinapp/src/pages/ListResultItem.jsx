function ListResultItem(props) {
    const { res } = props

    return (
        <li key={res.id}>
            {/* <h3>{res.id}</h3> */}
            <h3>Name: {res.name}</h3>
            <p>Description: {res.description}</p>
            <p>Location: {res.location}</p>
        </li>
    )
} export default ListResultItem;