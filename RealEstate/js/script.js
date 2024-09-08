'use strict'

// Slider =========================================================================
const heroSwiper = document.querySelector('.swiper-hero')

if (heroSwiper) {
  const swiperHero = new Swiper('.swiper-hero', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.main-hero__arrow.swiper-button-next',
      prevEl: '.main-hero__arrow.swiper-button-prev',
    },
  })
}

// =================================================================================

const tabNavItems = document.querySelectorAll('.tabs-deals__button')
const tabItems = document.querySelectorAll('.item-tabs')

document.addEventListener('click', function (e) {
  const targetElement = e.target
  // Burger ==============================
  if (targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  }
  // Tabs ================================
  let currentActiveIndex = null
  let newActiveIndex = null
  if (targetElement.closest('.tabs-deals__button')) {
    tabNavItems.forEach((tabNavItem, index) => {
      if (tabNavItem.classList.contains('active')) {
        currentActiveIndex = index
        tabNavItem.classList.remove('active')
      }
      if (tabNavItem === targetElement) {
        newActiveIndex = index
      }
    })
    targetElement.classList.add('active')
    tabItems[currentActiveIndex].classList.remove('active')
    tabItems[newActiveIndex].classList.add('active')
  }
})

// ================================================================================
