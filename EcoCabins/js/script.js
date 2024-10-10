'use strict'

document.addEventListener('click', function (e) {
  const targetElement = e.target
  if (targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  } else if (targetElement.closest('.menu-header__link')) {
    document.documentElement.classList.remove('menu-open')
  }
})
// ============================================

document.addEventListener('scroll', () => {
  scrollY > 0
    ? document.querySelector('header').classList.add('scroll')
    : document.querySelector('header').classList.remove('scroll')
})

// ============================================

const slider = new Swiper('.materials__swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.materials__swiper-pagination',
    clickable: true,
  },
})

// ============================================
