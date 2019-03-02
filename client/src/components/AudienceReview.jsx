import React from 'react';

const AudienceReview = (props) => {
  const row = [];
  for (let i = 0; i < props.reviews.length; i += 2) {
    row.push(props.reviews.slice(i, i + 2));
  }
  const reviews = row.map( (rows, i) => (
    <div className="row" key={i}>
      {rows.map( (audienceReview) => (
      <div className="review-wrapper col p-3" key={audienceReview.id}>  
        <div className="review">
          <div className="review-star">
          {(() => {
            const stars = [];
            for (let i = 0; i < audienceReview.stars; i++) {
              stars.push(<i className="far fa-star" key={i}></i>);
            }
            if (audienceReview.stars % 1 !== 0) {
              stars.push(<i className="far fa-star-half" key={audienceReview.stars + 1}></i>);
            }
            return stars;
          })()}
          </div>
          <div className="review-userReview">{audienceReview.review}</div>
        </div>
        <div className="review-user">
          <i className="far fa-user fa-2x"></i>
          <div>{audienceReview.username}</div>
        </div>
      </div>)
      )}
    </div>
  ));

  return (
  <div className="review-container">
    <div className="audienceReviewHeader row p-3">
      <div className='header-movietitle'>Audience Reviews for <em>{props.title}</em></div>
    </div>
    <div className="reviews">{reviews}</div>
    <div className="viewAll">View All</div>
  </div>
  )
}

export default AudienceReview;