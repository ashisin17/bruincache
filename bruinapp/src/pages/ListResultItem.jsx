function ListResultItem(props) {
    const { res } = props

    return (
        <li key={res.id}>
            <h3>{res.id}</h3>
        </li>
    )
} export default ListResultItem;