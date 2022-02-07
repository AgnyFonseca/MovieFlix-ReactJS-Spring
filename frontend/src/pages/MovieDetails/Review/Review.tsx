import './Review.css';
import { ReactComponent as StarIcon } from '../../../assets/images/star.svg';

type ReviewProps = {
    username: string;
    review: string;
}

const Review = (props : ReviewProps) => {
    return (
        <div className="review-container">
            <div className="review-username">
                <StarIcon />
                <h6>{props.username}</h6>
            </div>
            <div className="review-box">
                <p>{props.review}</p>
            </div>
        </div>
    );
}

export default Review;