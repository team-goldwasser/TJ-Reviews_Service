import React from 'react';
import getIDToDisplay from '../displayDivs';
import ViewAllReviews from './ViewAllReviews';

class AudienceReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.viewAll = this.viewAll.bind(this);
  }
  viewAll() {
    getIDToDisplay.getIDToDisplay();
    this.setState({
      clicked: !this.state.clicked
    });
  }
  render() {
    var row = [];
    for (let i = 0; i < this.props.reviews.length; i += 2) {
      row.push(this.props.reviews.slice(i, i + 2));
    }
    var reviews = row.map( (rows, i) => (
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
    if (this.state.clicked) {
      return (
        <ViewAllReviews title={this.props.title} environment={this.props.environment} id={this.props.id}/>
      )
    } else {
      return (
        <div>
          <div id="all-audience-reviews" style={{display:'none'}}></div>
          <div id="review-container">
            <div className="audienceReviewHeader row p-3">
              <div className='header-movietitle'>Audience Reviews for <em>{this.props.title}</em></div>
            </div>
            <div className="reviews">{reviews}</div>
            <div className="viewAll" onClick={this.viewAll}>View All</div>
          </div>
        </div>
      )
    }
  }
}

export default AudienceReview;