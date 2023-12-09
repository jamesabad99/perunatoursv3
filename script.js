const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  spaceBetween: 64,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev"
  },

  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 2,
      spaceBetween: 64
    }
  }
});
