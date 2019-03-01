import React from 'react';

class PostReviewSmall extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className='adduser-container-sm'>  
      <div className="add-wrapper-sm">
        <i className="fas fa-plus"></i>
        <br/>
        <div className="wantToSee-sm mobile-btn" value="+">Want to See</div>
      </div>
      <div className="add-wrapper-sm">
        <i className="fas fa-minus"></i>
        <br/>
        <div className="interested-sm mobile-btn" value="-">Not Interested</div>
      </div>
      <div className="add-wrapper-sm">
        <i className="fas fa-star"></i>
        <br/>
        <div className="addrating-sm mobile-btn" value="1">Add Rating</div>
      </div>
    </div>

    )
  }
}

export default PostReviewSmall;