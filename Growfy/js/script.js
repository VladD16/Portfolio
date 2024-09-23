'use strict'

// === Burger ==================================================

document.addEventListener('click', function (e) {
  const targetElement = e.target
  if (targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  }
})

// === Header Fixed ==========================================================

let header = document.querySelector('header')
let headerH = header.clientHeight
document.onscroll = function () {
  let scroll = window.scrollY
  if (scroll > headerH) {
    header.classList.add('fixed')
    document.body.style.paddingTop = headerH + 'px'
  } else {
    header.classList.remove('fixed')
    document.body.removeAttribute('style')
  }
}

// === Scroll smooth ==========================================================

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const goto = anchor.hasAttribute('href')
      ? anchor.getAttribute('href')
      : 'body'

    document.querySelector(goto).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

// =============================================================
