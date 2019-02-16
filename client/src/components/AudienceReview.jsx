import React from 'react';

const AudienceReview = (props) => (
  <div>
    <div className='audienceReviewHeader'>Audience Reviews for {props.title}</div>
    {props.reviews.map((audienceReview) => {
      return(
        <div className="review-container" key={audienceReview.id}>
          <div className="review-star">stars: {audienceReview.stars}</div>
          <div className="review-userReview">review: {audienceReview.review}</div>
          <div className="review-user">username: {audienceReview.username}</div>
        </div>
      );
    })}
  </div>
)

export default AudienceReview;