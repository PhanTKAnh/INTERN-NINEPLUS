$('.wrap-about').slick({
  dots: true,          // Hiển thị dấu chấm điều hướng
  infinite: true,      // Cho phép trượt vô hạn
  speed: 500,          // Thời gian chuyển đổi slide (ms)
  slidesToShow: 3,     // Hiển thị 3 slides trên màn hình lớn
  slidesToScroll: 1,   // Cuộn từng slide một
  arrows: false,       // Ẩn mũi tên điều hướng
  responsive: [
    {
      breakpoint: 1024, // Màn hình nhỏ hơn 1024px
      settings: {
        slidesToShow: 2, // Hiển thị 2 slides
        slidesToScroll: 2, 
      }
    },
    {
      breakpoint: 780, // Màn hình nhỏ hơn 767px
      settings: {
        slidesToShow: 1, // Hiển thị 1 slide
        dots: true       // Đảm bảo dots hiển thị trên mobile
      }
    }
  ]
});
