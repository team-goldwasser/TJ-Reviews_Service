import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import AudienceReview from './components/AudienceReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "284054",
      title: "How to Train your Dragon: The Hidden World",
      reviews: []
    };
    this.getMovieID = this.getMovieID.bind(this);
    this.getMovieReviews = this.getMovieReviews.bind(this);
  }

  // get ID from source of truth
  getMovieReviews() {
    $.ajax({
      url: `/reviews/audience/${this.state.id}`,
      success: (data) => {
        console.log('data', JSON.parse(data));
        this.setState({
          reviews: JSON.parse(data)
        });
      },
      error: (err) => {
        console.log("error getting movie data", err);
      },
      type: "GET"
    });
  }

  // get ID from source of truth
  getMovieID() {
    // AJAX call to get movie id/title
    // on success, set id/title
  }

  componentDidMount() {
    // this.getMovieID();
    this.getMovieReviews();
  }
  render() {
    return(
      <AudienceReview title={this.state.title} reviews={this.state.reviews}/>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('audience-reviews'));