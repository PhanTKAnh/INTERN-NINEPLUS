$(function() {
  $('.slide-container').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      // autoplay: true,
      // autoplaySpeed: 3000,
      arrows: false
  });

  $('.game-list').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $('.hot-row .custom-prev'),
      nextArrow: $('.hot-row .custom-next'),
      responsive: [
          {
            breakpoint: 720,
            settings: {
              slidesToShow: 1,
            }
          }
      ]
  });

  $('.category-list').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $('.category-row .custom-prev'),
      nextArrow: $('.category-row .custom-next'),
      responsive: [
          {
            breakpoint: 720,
            settings: {
              slidesToShow: 1,
              dots: true,
            },
            
          }
      ]
  });
});
