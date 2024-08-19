import Star from "../Assets/Star/star"

export default function StarRating({userRating}) {
    const renderStar = () => {
        if(userRating === 0) {
            return <h3>No Rating</h3>
          }
          if(userRating === 1) {
            return <div className="user-rating-stars"><Star /></div>
          }
          if(userRating === 2) {
            return <div className="user-rating-stars"><Star /><Star /></div>
          }
          if(userRating === 3) {
            return <div className="user-rating-stars"><Star /><Star /><Star /></div>
          }
          if(userRating === 4) {
            return <div className="user-rating-stars"><Star /><Star /><Star /><Star /></div>
          }
          if(userRating === 5) {
            return <div className="user-rating-stars"><Star /><Star /><Star /><Star /><Star /></div>
          }
    }
    return (
        <div>{renderStar()}</div>
    )
}