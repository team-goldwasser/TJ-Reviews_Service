function getIDToDisplay() {
  var divs = [
    "addmobilerating",
    "post-reviews",
    "block",
    "showtime",
    "all-audience-reviews",
    "review-container"
  ];
  divs.forEach( (div) => {
    var toggleDisplay = document.getElementById(div);
    if (toggleDisplay) {
      display(toggleDisplay);
    }
  });
}

function display(x) {
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

module.exports = {getIDToDisplay}