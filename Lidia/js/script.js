'use strict'

//////// Burger ///////////////////////////////////////////////

document.addEventListener('click', function (e) {
  const targetElement = e.target
  if (targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  } else if (targetElement.closest('.menu__link')) {
    document.documentElement.classList.remove('menu-open')
  }
})

///////// Header fixed //////////////////////////////////////////////

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

////////// Scroll To /////////////////////////////////////////////

const anchors = document.querySelectorAll('a[href*="#"]')
const headerHeight = header.clientHeight

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    // ---------------------------------
    const removeActiveClasses = () => {
      anchors.forEach((anchor) => anchor.classList.remove('active'))
    }
    const addActiveClass = (id) => {
      const activeAnchor = document.querySelector(`a[href="${id}"]`)
      if (activeAnchor) {
        activeAnchor.classList.add('active')
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            removeActiveClasses()
            addActiveClass(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0.1,
      }
    )
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })
    // ---------------------------------
    const goto = anchor.hasAttribute('href')
      ? anchor.getAttribute('href')
      : 'body'

    const targetElement = document.querySelector(goto)
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  })
}

///////////////////////////////////////////////////////
