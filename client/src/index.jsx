import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import AudienceReview from './components/AudienceReview.jsx';
import PostReview from './components/PostReview.jsx';
import PostReviewSmall from './components/PostReviewSmall.jsx';
import {getMovieIDURL, getEnvironment} from '../../server/environment.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      urlTitle: getMovieIDURL(),
      reviews: [],
      environment: getEnvironment(),
      title: ""
    };
    this.getMovieID = this.getMovieID.bind(this);
    this.getMovieReviews = this.getMovieReviews.bind(this);
  }

  getMovieReviews() {
    $.ajax({
      url: this.state.environment.reviews + `/reviews/audience/${this.state.id}`,
      success: (data) => {
        // console.log('data', JSON.parse(data));
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
    console.log('run', this.state.urlTitle);
    $.ajax({
      url: this.state.environment.scoreboard + `/m/movieinfo/${this.state.urlTitle}`,
      // on success, set id/title
      success: (data) => {
        console.log('data', (data.id.toString()));
        this.setState({
          title: data.title,
          id: data.id.toString()
        });
        this.getMovieReviews();
      },
      error: (err) => {
        console.log("error getting movie data", err);
      },
      type: "GET"
    });
  }

  componentDidMount() {
    this.getMovieID();
    // this.getMovieReviews();
  }
  render() {
    return (
      <div>
        <AudienceReview title={this.state.title} reviews={this.state.reviews}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('audience-reviews'));
ReactDOM.render(<PostReview />, document.getElementById('post-reviews'));
ReactDOM.render(<PostReviewSmall />, document.getElementById('addmobilerating'));