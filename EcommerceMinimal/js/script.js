'use strict'

window.onload = () => {
  document.addEventListener('click', (e) => {
    const currentElement = e.target
    // ------ Search
    if (currentElement.closest('.top-header__button')) {
      document.body.classList.toggle('search-active')
    } else if (!currentElement.closest('.top-header__input'))
      document.body.classList.remove('search-active')
    // ------ Burger
    if (currentElement.closest('.icon-menu')) {
      document.body.classList.toggle('menu-open')
    } else if (currentElement.closest('.menu__link')) {
      document.body.classList.remove('menu-open')
    }
  })
  // ======
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.classList.remove('search-active')
    }
  })
  // ======
  document.addEventListener('scroll', () => {
    scrollY > 0
      ? document.querySelector('header').classList.add('scroll')
      : document.querySelector('header').classList.remove('scroll')
  })
}
