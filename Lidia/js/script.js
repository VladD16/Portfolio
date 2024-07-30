'use strict'

document.addEventListener('click', function (e) {
  const targetElement = e.target
  if (targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  }
})

///////////////////////////////////////////////////////

let header = document.querySelector('header')
let headerH = header.clientHeight
console.log(headerH)
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

///////////////////////////////////////////////////////
