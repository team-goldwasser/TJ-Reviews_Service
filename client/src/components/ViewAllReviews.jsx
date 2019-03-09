import React from 'react';
import $ from 'jquery';

class ViewAllReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      maxPage: 1,
      paginatedReviews: [{
        id: 59,
        review: "Cat ip",
        stars: 3,
        username: "deal"
      },
      {
        id: 60,
        review: "Cat ipsum dolor sit amet, touch my tail, i shred your hand purrrr slap owner's face at 5am until human fills food dish. Purr while eating sit in box or steal the warm chair right after you get up damn…",
        stars: 3,
        username: "deal"
      }
    ]
    }
    this.getReviewCount = this.getReviewCount.bind(this);
    this.getPaginatedReview = this.getPaginatedReview.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
  }
  getReviewCount() {
    $.ajax({
      url: this.props.environment.reviews + `/reviews/audience/${this.props.id}/count`,
      success: (data) => {
        this.setState({
          maxPage: Math.ceil(JSON.parse(data)[0].maxPage / 3)
        });
        this.getPaginatedReview();
      },
      error: (err) => {
        console.log("error getting movie review count", err);
      },
      type: "GET"
    });
  }
  getPaginatedReview() {
    $.ajax({
      url: this.props.environment.reviews + `/reviews/audience/${this.props.id}/${this.state.page}`,
      success: (data) => {
        this.setState({
          paginatedReviews: JSON.parse(data)
        });
      },
      error: (err) => {
        console.log("error getting movie review count", err);
      },
      type: "GET"
    });
  }
  decrementPage() {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page -= 1
      });
      this.getPaginatedReview();
    }
  }
  incrementPage() {
    if (this.state.page < this.state.maxPage) {
      this.setState({
        page: this.state.page += 1
      });
      this.getPaginatedReview();
    }
  }
  componentDidMount() {
    this.getReviewCount();
  }
  render() {
    return (
      <div className="allUserReviews">
        <div className="audienceReviewHeader row p-3">
          <div className='header-movietitle'>{this.props.title} Reviews</div>
        </div>
          <ul className="allreview-nav nav-tabs"> 
            <li>
              <a href="">All Critics</a>
            </li> 
            <li>
              <a href="">Top Critics</a>
            </li> 
            <li>
              <a href="">My Critics</a>
            </li> 
            <li className="active">
              <a href="">Audience</a>
            </li> 
          </ul>
          <div className="pagination"> 
            <a><i className="fas fa-chevron-left" onClick={() => this.decrementPage()}></i></a>
            <span className="pageInfo">Page {this.state.page} of {this.state.maxPage}</span> 
            <a><i className="fas fa-chevron-right" onClick={() => this.incrementPage()}></i></a>
          </div>
          <div className="review_table">
          {this.state.paginatedReviews.map((review) => {
          return(
            <div className="review_table_row" key={review.id}>
              <div className="left-col">
                <div className="allreview-user">
                  <i className="far fa-user fa-3x" style={{height: "50px"}}></i>
                </div>
                <div className="allreview-name">{review.username}</div>
              </div>
              <div className="right-col">
                <div className="review-star">
                {(() => {
                  const stars = [];
                  for (let i = 0; i < review.stars; i++) {
                    stars.push(<i className="far fa-star" key={i}></i>);
                  }
                  if (review.stars % 1 !== 0) {
                    stars.push(<i className="far fa-star-half" key={review.stars + 1}></i>);
                  }
                  return stars;
                })()}
                </div>
                <div className="review.userReview">{review.review}</div>
              </div>
            </div>
          );
          })}
          </div>
      </div>
    )
  }
}


export default ViewAllReviews;