import React from "react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating-stars-component";

const UserComment = (props) => {
    return (
        <>
            <div className="reviews-comment">
                <img style={{ width: "56px", height: "56px" }} src={props.profileImgUrl} alt="avatar bulunamadi." />
                <div className="reviews-content">
                    <div className="reviews-title-stars">
                        <div className="reviews-title-data">
                            <h1>{props.title}</h1>
                            <span>{props.history}</span>
                        </div>
                        <Rating
                            count={5}
                            size={24}
                            value={props.rating}
                            edit={false}
                            emptyIcon={<FaStar color="#ccc" />}
                            filledIcon={<FaStar color="#ffc107" />}
                            isHalf={false}
                        />
                    </div>
                    <p>{props.comment}</p>
                </div>
            </div>
        </>
    )
};

export default UserComment;
