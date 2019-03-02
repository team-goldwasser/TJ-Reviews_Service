import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import PostReview from './components/PostReview.jsx';
import PostReviewSmall from './components/PostReviewSmall.jsx';

ReactDOM.render(<App />, document.getElementById('audience-reviews'));
ReactDOM.render(<PostReview />, document.getElementById('post-reviews'));
ReactDOM.render(<PostReviewSmall />, document.getElementById('addmobilerating'));