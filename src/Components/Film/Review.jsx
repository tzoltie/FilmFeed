import StarRating from "../Rating";

export default function FilmReview({review}) {
  return (
    <li className="review-list-item">
      <div className="review-header-box">
        <div>
          <img
            src={review.user.profile.profilePic}
            className="review-profile-pic"
          />
        </div>
      </div>
      <div className="review-content-username-box">
        <div className="username-rating-box">
          <div className="username-box">
            <h5>{review.user.username}</h5>
          </div>
          <div className="users-rating-box">
            <StarRating
              userRating={review.rating}
              styling={"user-rating-stars-review-section"}
            />
          </div>
        </div>
        <div>
          <p>{review.content}</p>
        </div>
      </div>
    </li>
  );
}
