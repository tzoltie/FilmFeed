import Star from "../Assets/Star/star"

export default function StarRating({userRating, styling}) {
    const renderStar = () => {
        if(userRating === 0) {
            return;
          }
          if(userRating === 1) {
            return <div className={styling}><Star /></div>
          }
          if(userRating === 2) {
            return <div className={styling}><Star /><Star /></div>
          }
          if(userRating === 3) {
            return <div className={styling}><Star /><Star /><Star /></div>
          }
          if(userRating === 4) {
            return <div className={styling}><Star /><Star /><Star /><Star /></div>
          }
          if(userRating === 5) {
            return <div className={styling}><Star /><Star /><Star /><Star /><Star /></div>
          }
    }
    return (
        <div>{renderStar()}</div>
    )
}