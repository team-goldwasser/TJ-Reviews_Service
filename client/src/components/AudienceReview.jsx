import React from 'react';

const AudienceReview = (props) => {
  const row = [];
  for (let i = 0; i < props.reviews.length; i += 2) {
    row.push(props.reviews.slice(i, i + 2));
  }
  const reviews = row.map( (rows, i) => (
    <div className="row" key={i}>
      {rows.map( (audienceReview) => (
      <div className="col w-50 p-3" key={audienceReview.id}>
        <div className="review-star">stars: {audienceReview.stars}</div>
        <div className="review-userReview">review: {audienceReview.review}</div>
        <div className="review-user">username: {audienceReview.username}</div>
      </div>)
      )}
    </div>
  ));

  return (
  <div className="review-container">
    <div className="audienceReviewHeader row p-3">
      <div className='header-movietitle'>Audience Reviews for {props.title}</div>
    </div>
    <div className="reviews">{reviews}</div>
  </div>
  )
}

export default AudienceReview;