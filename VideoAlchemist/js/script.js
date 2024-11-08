'use strict'

window.onload = () => {
  // ---- Burger ------
  document.addEventListener('click', function (e) {
    const targetElement = e.target
    if (targetElement.closest('.icon-menu')) {
      document.documentElement.classList.toggle('menu-open')
    } else if (targetElement.closest('.menu__link')) {
      document.documentElement.classList.remove('menu-open')
    }
  })
  // ---- Parallax -----
  function parallaxOnMouse() {
    const elements = document.querySelectorAll('[data-prllx-mouse]')
    let x = 0
    let y = 0

    function animate() {
      elements.forEach((el) => {
        const coefficient = el.dataset.prllxMouse
        el.style.transform = `translate(${x / coefficient}px, ${
          y / coefficient
        }px)`
      })
    }

    document.addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY
      requestAnimationFrame(animate)
    })

    animate()
  }

  parallaxOnMouse()
  // --------------------------------
}
