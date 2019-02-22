$(document).ready(function() {
  const maxLen = 235;
  const ellipsesText = "...";
  const moreText = "More";
  const lessText = "Less";
  
  $('.review-userReview').each(function() {
      let text = $(this).html();

      if(text.length > maxLen) {
          let shown = text.substr(0, maxLen);
          let hidden = text.substr(maxLen, text.length - maxLen);
          let html = shown + '<span class="ellipses">' + ellipsesText+ '&nbsp;</span><span class="showMore"><span>' + hidden + '</span>&nbsp;&nbsp;<a href="" class="moreLink">' + moreText + '</a></span>';

          $(this).html(html);
      }

  });

  $(".moreLink").click(function(){
      if($(this).hasClass("less")) {
          $(this).removeClass("less");
          $(this).html(moreText);
      } else {
          $(this).addClass("less");
          $(this).html(lessText);
      }
      $(this).parent().prev().toggle();
      $(this).prev().toggle();
      return false;
  });
});