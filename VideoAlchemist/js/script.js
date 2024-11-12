'use strict'

window.onload = () => {
  // ==========  Burger ============================================
  document.addEventListener('click', function (e) {
    const targetElement = e.target
    if (targetElement.closest('.icon-menu')) {
      document.documentElement.classList.toggle('menu-open')
    } else if (targetElement.closest('.menu-header__link')) {
      document.documentElement.classList.remove('menu-open')
    }
  })

  // ======= Parallax ===============================================
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

  // ======== Slider =========================================
  const slider = new Swiper('.portfolio__swiper', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.portfolio__swiper-button-next',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      385: {
        slidesPerView: 1.4,
        spaceBetween: 20,
      },
      625: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3.2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3.2,
        spaceBetween: 40,
      },
    },
  })

  // ======== Scroll To =========================================
  const anchors = document.querySelectorAll('a[href*="#"]')
  const headerHeight = document.querySelector('header').offsetHeight
  const sections = document.querySelectorAll('section[id]')

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
      threshold: 0.5,
    }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const goto = anchor.getAttribute('href')
      const targetElement = document.querySelector(goto)
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })

      // Установка активного класу після завершення плавного скролу
      setTimeout(() => {
        removeActiveClasses()
        addActiveClass(goto)
      }, 500)
    })
  }
}
