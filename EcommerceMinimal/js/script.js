'use strict'

window.onload = () => {
  document.addEventListener('click', (e) => {
    const currentElement = e.target
    // ------ Search ------------------------------------
    if (currentElement.closest('.top-header__button')) {
      document.body.classList.toggle('search-active')
    } else if (!currentElement.closest('.top-header__input'))
      document.body.classList.remove('search-active')
    // ------ Burger ------------------------------------
    if (currentElement.closest('.icon-menu')) {
      document.body.classList.toggle('menu-open')
    } else if (currentElement.closest('.menu__link')) {
      document.body.classList.remove('menu-open')
    }
  })
  // ====================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.classList.remove('search-active')
    }
  })
  // ====================================================
  document.addEventListener('scroll', () => {
    scrollY > 0
      ? document.querySelector('header').classList.add('scroll')
      : document.querySelector('header').classList.remove('scroll')
  })
  // ====== Tabs ===========================================================
  const tabButtons = document.querySelectorAll('.tabs-products__button')
  const tabItems = document.querySelectorAll('.tabs-products__item')

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter')

      // Видаляємо клас 'active' з усіх кнопок
      tabButtons.forEach((btn) => btn.classList.remove('active'))
      button.classList.add('active')

      // Фільтруємо елементи
      tabItems.forEach((item) => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'grid'
        } else {
          item.style.display = 'none'
        }
      })
    })
  })
  // ===== Tabs Bottom + Slider ================================================
  const tabButtonsBottom = document.querySelectorAll('.tabs-best__button')
  const tabItemsBottom = document.querySelectorAll('.tabs-best__swiper-slide')

  // Ініціалізація слайдера Swiper
  const slider = new Swiper('.tabs-best__swiper', {
    loop: false,
    autoHeight: true,
    watchOverflow: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1350: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: '.tabs-best__swiper-button-next',
      prevEl: '.tabs-best__swiper-button-prev',
    },
  })

  // Функція для вирівнювання висоти слайдів по найбільшому елементу
  const equalizeSlideHeights = () => {
    const slides = document.querySelectorAll('.tabs-best__swiper-slide')
    let maxHeight = 0

    // Знаходимо максимальну висоту
    slides.forEach((slide) => {
      slide.style.height = 'auto' // Скидання висоти, щоб знайти нову максимальну
      if (slide.offsetHeight > maxHeight) {
        maxHeight = slide.offsetHeight
      }
    })

    // Застосовуємо максимальну висоту до всіх слайдів
    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`
    })

    // Оновлення Swiper після зміни висоти
    slider.updateAutoHeight()
  }

  // Функція для оновлення навігації та можливості свайпів
  const updateNavigation = () => {
    const visibleSlides = Array.from(tabItemsBottom).filter(
      (slide) => slide.style.display !== 'none'
    )
    const currentBreakpoint =
      slider.currentBreakpoint || Object.keys(slider.params.breakpoints)[0]
    const slidesPerView =
      slider.params.breakpoints[currentBreakpoint].slidesPerView || 1

    if (visibleSlides.length <= slidesPerView) {
      slider.navigation.disable()
      slider.allowSlideNext = false
      slider.allowSlidePrev = false
    } else {
      slider.navigation.enable()
      slider.allowSlideNext = true
      slider.allowSlidePrev = true
    }

    slider.update() // Оновлення Swiper після оновлення навігації
  }

  tabButtonsBottom.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter')

      // Видаляємо клас 'active' з усіх кнопок
      tabButtonsBottom.forEach((btn) => btn.classList.remove('active'))
      button.classList.add('active')

      // Фільтруємо елементи
      const updatedSlides = Array.from(tabItemsBottom)
        .map((item) => {
          if (
            filter === 'all' ||
            item.getAttribute('data-category') === filter
          ) {
            item.style.display = 'grid'
            return item
          } else {
            item.style.display = 'none'
            return null
          }
        })
        .filter((item) => item !== null)

      // Оновлення Swiper після фільтрації
      slider.removeAllSlides()
      slider.appendSlide(updatedSlides)

      setTimeout(() => {
        equalizeSlideHeights() // Вирівнювання висоти слайдів
        updateNavigation()
      }, 50) // Невелика затримка для коректного оновлення
    })
  })

  // Виклик функції оновлення при завантаженні сторінки
  equalizeSlideHeights() // Вирівнювання висоти слайдів
  updateNavigation()

  // Виклик функції оновлення при зміні розміру вікна
  window.addEventListener('resize', () => {
    slider.update() // Оновлення Swiper при зміні розміру вікна
    equalizeSlideHeights() // Вирівнювання висоти слайдів
    updateNavigation() // Оновлення навігації після зміни розміру вікна
  })

  // Оновлення навігації після зміни слайду
  slider.on('slideChange', () => {
    updateNavigation()
  })
  // ==== Scroll To ===================================================================
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

  // ===== Spoilers =====================================================
  const spoilersArray = document.querySelectorAll('[data-spoilers]')

  // Add styles to hide the marker for summary inside data-spoilers
  const style = document.createElement('style')
  style.textContent = `
    [data-spoilers] summary {
      list-style-type: none;
    }
  `
  document.head.appendChild(style)

  if (spoilersArray.length > 0) {
    spoilersArray.forEach((spoilersBlock) => {
      const detailsElements = spoilersBlock.querySelectorAll('details')
      detailsElements.forEach((details) => {
        details.open = true // Set the open attribute initially
        details.addEventListener('click', (e) => e.preventDefault())
      })

      const summaryElements = spoilersBlock.querySelectorAll('summary')
      summaryElements.forEach((summary) => {
        summary.addEventListener('click', (e) => e.preventDefault())
      })
    })

    const spoilersRegular = Array.from(spoilersArray).filter(
      (item) => !item.dataset.spoilers.split(',')[0]
    )
    if (spoilersRegular.length > 0) initSpoilers(spoilersRegular)

    const spoilersMedia = Array.from(spoilersArray).filter(
      (item) => item.dataset.spoilers.split(',')[0]
    )
    if (spoilersMedia.length > 0) {
      const breakpointsArray = spoilersMedia.map((item) => {
        const [value, type = 'max'] = item.dataset.spoilers
          .split(',')
          .map((param) => param.trim())
        return { value, type, item }
      })

      const mediaQueries = Array.from(
        new Set(
          breakpointsArray.map(
            ({ type, value }) => `(${type}-width: ${value}px),${value},${type}`
          )
        )
      )

      mediaQueries.forEach((breakpoint) => {
        const [query, value, type] = breakpoint.split(',')
        const matchMedia = window.matchMedia(query)

        const matchedSpoilers = breakpointsArray.filter(
          (breakpoint) => breakpoint.value === value && breakpoint.type === type
        )

        const handleChange = () => initSpoilers(matchedSpoilers, matchMedia)
        matchMedia.addListener(handleChange)
        handleChange()
      })
    }
  }

  function initSpoilers(spoilersArray, matchMedia = false) {
    spoilersArray.forEach((spoilersBlock) => {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock
      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add('_init')
        initSpoilerBody(spoilersBlock)
        spoilersBlock.addEventListener('click', setSpoilerAction)
      } else {
        spoilersBlock.classList.remove('_init')
        initSpoilerBody(spoilersBlock, false)
        spoilersBlock.removeEventListener('click', setSpoilerAction)
      }
    })
  }

  function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
    const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]')
    spoilerTitles.forEach((spoilerTitle) => {
      spoilerTitle.tabIndex = hideSpoilerBody ? 0 : -1
      spoilerTitle.nextElementSibling.hidden =
        hideSpoilerBody && !spoilerTitle.classList.contains('_active')
    })
  }

  function setSpoilerAction(e) {
    const el = e.target.closest('[data-spoiler]')
    if (el) {
      const spoilersBlock = el.closest('[data-spoilers]')
      const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler')
      if (!spoilersBlock.querySelector('._slide')) {
        if (oneSpoiler && !el.classList.contains('_active')) {
          hideSpoilersBody(spoilersBlock)
        }
        el.classList.toggle('_active')
        _slideToggle(el.nextElementSibling, 300)
      }
      e.preventDefault()
    }
  }

  function hideSpoilersBody(spoilersBlock) {
    const activeTitle = spoilersBlock.querySelector('[data-spoiler]._active')
    if (activeTitle) {
      activeTitle.classList.remove('_active')
      _slideUp(activeTitle.nextElementSibling, 300)
    }
  }

  const _slideUp = (target, duration = 300) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.style.transition = `height ${duration}ms, padding ${duration}ms, margin ${duration}ms`
      target.style.height = target.offsetHeight + 'px'
      requestAnimationFrame(() => {
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0
      })
      setTimeout(() => {
        target.hidden = true
        target.removeAttribute('style')
        target.classList.remove('_slide')
      }, duration)
    }
  }

  const _slideDown = (target, duration = 300) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      if (target.hidden) target.hidden = false
      const height = target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.transition = `height ${duration}ms, padding ${duration}ms, margin ${duration}ms`
      requestAnimationFrame(() => {
        target.style.height = height + 'px'
      })
      setTimeout(() => {
        target.removeAttribute('style')
        target.classList.remove('_slide')
      }, duration)
    }
  }

  const _slideToggle = (target, duration = 300) => {
    return target.hidden
      ? _slideDown(target, duration)
      : _slideUp(target, duration)
  }
}
