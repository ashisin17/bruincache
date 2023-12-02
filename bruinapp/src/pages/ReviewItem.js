function ReviewItem(props) {
    const { res } = props

    return (
        <li key={res.owner}>
            <p>{res.owner} | {res.rating}/5 <br/>
            {res.review} <hr/> </p>
        </li>
    )
} export default ReviewItem;