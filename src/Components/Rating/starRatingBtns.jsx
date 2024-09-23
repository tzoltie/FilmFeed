import Star from "../Assets/Star/star";
import Button from "../Button";

export default function StarRatingBtn({onClick}) {
    return (
        <div>
            <Button text={<Star />} className={'star_0-rating-btn'} onClick={() => onClick("1")}/>
            <Button text={<Star />} className={"star_1-rating-btn"} onClick={() => onClick("2")}/>
            <Button text={<Star />} className={"star_2-rating-btn"} onClick={() => onClick("3")}/>
            <Button text={<Star />} className={"star_3-rating-btn"} onClick={() => onClick("4")}/>
            <Button text={<Star />} className={"star_4-rating-btn"} onClick={() => onClick("5")}/>
        </div>
    )
}