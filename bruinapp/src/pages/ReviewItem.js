function ReviewItem(props) {
    const { res } = props

    return (
        <li key={res.owner}>
            <p>{res.review} SCORE: {res.rating}/5</p>
        </li>
    )
} export default ReviewItem;