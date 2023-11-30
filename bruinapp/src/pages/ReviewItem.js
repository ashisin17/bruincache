function ReviewItem(props) {
    const { res } = props

    return (
        <li key={res.owner}>
            <p>{res.owner} | {res.rating}/5 <br/>
            {res.review} </p>
            <hr/>
        </li>
    )
} export default ReviewItem;