'use strict'

const reviewsSwiper = document.querySelector('.swiper-reviews')

if (reviewsSwiper) {
  const swiperReviews = new Swiper('.swiper-reviews', {
    // Optional parameters
    loop: true,
    autoHeight: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
}
