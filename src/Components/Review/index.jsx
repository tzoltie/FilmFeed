import { useRef, useState } from "react"
import Button from "../Button"
import "./styling.css"
import DoneCheck from "../Assets/Done/index.jsx"
import { addRating } from "../../Utils/apiClient.js"


export default function Review({rating, filmId, film, setReview, ratingSection}) {
    const [reviewForm, setReviewForm] = useState({
        content: "",
        rating: rating
    })
   

    const onChange = (e) => {
        const { name, value } = e.target
        setReviewForm({
            [name]: value,
            rating: rating
        })
    }

    const submitReview = () => {
        addRating(reviewForm, filmId, film).then(() => {
            setReview(prev => !prev)
        })
        setReviewForm({
            content: "",
            rating: 0
        })
    }

    return (
        <div className="review-container" ref={ratingSection}>
            <div>
                <Button className={"submit-review-btn"} text={<DoneCheck />} onClick={() => submitReview()}/>
            </div>
            <form>
                <textarea 
                name="content"
                value={reviewForm.content}
                onChange={onChange}
                className="review-text-input"
                placeholder="Add a review or hit the tick to just add rating"/>
            </form>
        </div>
    )
}