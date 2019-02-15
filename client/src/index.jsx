const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "284054",
      stars: "",
      review: ""

    };
    this.getMovieID = this.getMovieID.bind(this);
    this.getMovieReviews = this.getMovieReviews.bind(this);
  }

  // get ID from source of truth
  getMovieReviews() {
    $.ajax({
      url: `/reviews/audience/${this.state.title}`,
      success: (data) => {
        console.log('wtf', data);
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
      <div>
        <div className='audienceReviewHeader'>Audience Reviews for {this.state.title}</div>
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'));