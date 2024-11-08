'use strict'

function marquee() {
  /*
          Інструкція:
          Структура: Можна вказувати будь які класи та теги елементам.
          <div data-marquee>
              <span>element one</span>
              <div>element two</div>
          </div>
  !!! Щоб це запрацювало, потрібно обов'язково викликати функцію marquee() !!! 
          Додаткові налаштування (Можна не вказувати):
          data-marquee-space='30' - Відступ між елементами (За замовчанням 30px)
          data-marquee-speed='1000' - Швидкість анімації (За замовчанням 1000) Вказувати в ms 1s = 1000
          data-marquee-pause-mouse-enter - Зупиняти анімацію при наведенні миші.
          data-marquee-direction='left' - Направлення анімації "top, right, bottom, left" (За замовчанням left)
          !Важливо: При використанні data-marquee-direction 'top' або 'bottom' має бути фіксована висота + overflow: hidden;
      */

  const $marqueeArray = document.querySelectorAll('[data-marquee]')
  const CLASS_NAMES = {
    wrapper: 'marquee-wrapper',
    inner: 'marquee-inner',
    item: 'marquee-item',
  }

  if (!$marqueeArray.length) return

  const { head } = document

  // Функція(фільтр) зменшення кількості викликів функції при зміні розмірів вьюпорта. (Зменшення навантаження на систему)
  const debounce = (delay, fn) => {
    let timerId
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        fn(...args)
        timerId = null
      }, delay)
    }
  }
  // Подія зміни розмірів вьюпорта
  const onWindowResize = (cb) => {
    if (!cb && !isFunction(cb)) return

    const handleResize = () => {
      cb()
    }

    window.addEventListener('resize', debounce(15, handleResize))

    handleResize()
  }

  // Створюємо структуру
  const buildMarquee = (marqueeNode) => {
    if (!marqueeNode) return

    const $marquee = marqueeNode
    const $childElements = $marquee.children

    if (!$childElements.length) return
    $marquee.classList.add(CLASS_NAMES.wrapper)
    Array.from($childElements).forEach(($childItem) =>
      $childItem.classList.add(CLASS_NAMES.item)
    )

    const htmlStructure = `<div class="${CLASS_NAMES.inner}">${$marquee.innerHTML}</div>`
    $marquee.innerHTML = htmlStructure
  }

  // Функція отримання розмірів елементів
  const getElSize = ($el, isVertical) => {
    if (isVertical) return $el.getBoundingClientRect().height
    return $el.getBoundingClientRect().width
  }

  $marqueeArray.forEach(($wrapper) => {
    if (!$wrapper) return

    buildMarquee($wrapper)

    const $marqueeInner = $wrapper.firstElementChild
    let cacheArray = []

    if (!$marqueeInner) return

    const dataMarqueeSpace = parseFloat(
      $wrapper.getAttribute('data-marquee-space')
    )
    const spaceBetween = !isNaN(dataMarqueeSpace) ? dataMarqueeSpace : 30
    const speed =
      parseFloat($wrapper.getAttribute('data-marquee-speed')) / 10 || 100
    const isMousePaused = $wrapper.hasAttribute(
      'data-marquee-pause-mouse-enter'
    )
    const direction = $wrapper.getAttribute('data-marquee-direction')
    const isVertical = direction === 'bottom' || direction === 'top'
    const animName = `marqueeAnimation-${Math.floor(Math.random() * 10000000)}`
    let startPosition =
      parseFloat($wrapper.getAttribute('data-marquee-start')) || 0

    // Динамічні данні, вираховуються при роботі скрипту.
    let sumSize = 0
    let firstScreenVisibleSize = 0
    let initialSizeElements = 0
    let initialElementsLength = $marqueeInner.children.length
    let index = 0
    let counterDublicateElements = 0

    // Ініціалізація івентів.
    const initEvents = () => {
      if (startPosition)
        $marqueeInner.addEventListener(
          'animationiteration',
          onChangeStartPosition
        )

      if (!isMousePaused) return
      $marqueeInner.addEventListener('mouseenter', onChangePaused)
      $marqueeInner.addEventListener('mouseleave', onChangePaused)
    }

    const onChangeStartPosition = () => {
      console.log('work')
      startPosition = 0
      $marqueeInner.removeEventListener(
        'animationiteration',
        onChangeStartPosition
      )
      onResize()
    }

    // Додавання базових стилів для корректної роботи анімації.
    const setBaseStyles = (firstScreenVisibleSize) => {
      let baseStyle = 'display: flex; flex-wrap: nowrap;'

      if (isVertical) {
        baseStyle += `
                flex-direction: column;
              position: relative;
              will-change: transform;`

        if (direction === 'bottom') {
          baseStyle += `top: -${firstScreenVisibleSize}px;`
        }
      } else {
        baseStyle += `
                position: relative;
              will-change: transform;`

        if (direction === 'right') {
          baseStyle += `left: -${firstScreenVisibleSize}px;;`
        }
      }

      $marqueeInner.style.cssText = baseStyle
    }

    // Функція повертає значення на яке потрібно змістити елементи при анімації.
    const setdirectionAnim = (totalWidth) => {
      switch (direction) {
        case 'right':
        case 'bottom':
          return totalWidth
        default:
          return -totalWidth
      }
    }

    // Функція анімації.
    const animation = () => {
      const keyFrameCss = `@keyframes ${animName} {
                      0% {
                          transform: translate${
                            isVertical ? 'Y' : 'X'
                          }(${startPosition}%);
                      }
                      100% {
                          transform: translate${
                            isVertical ? 'Y' : 'X'
                          }(${setdirectionAnim(firstScreenVisibleSize)}px);
                      }
                  }`
      const $style = document.createElement('style')

      $style.classList.add(animName)
      $style.innerHTML = keyFrameCss
      head.append($style)

      $marqueeInner.style.animation = `${animName} ${
        (firstScreenVisibleSize +
          (startPosition * firstScreenVisibleSize) / 100) /
        speed
      }s infinite linear`
      console.log(
        (firstScreenVisibleSize +
          (startPosition * firstScreenVisibleSize) / 100) /
          speed
      )
    }

    // Функція роботи з елементами. (дублювання, вказання \ підрахунок розмірів)
    const addDublicateElements = () => {
      // Після зміни розмірів екрану, обнуляємо всі динамічні данні.
      sumSize =
        firstScreenVisibleSize =
        initialSizeElements =
        counterDublicateElements =
        index =
          0

      const $parentNodeWidth = getElSize($wrapper, isVertical)

      let $childrenEl = Array.from($marqueeInner.children)

      if (!$childrenEl.length) return

      if (!cacheArray.length) {
        cacheArray = $childrenEl.map(($item) => $item)
      } else {
        $childrenEl = [...cacheArray]
      }

      // Додаємо базові стилів флексів для коректного підрахунку розмірів елементів.
      $marqueeInner.style.display = 'flex'
      if (isVertical) $marqueeInner.style.flexDirection = 'column'
      // Обнуляємо кількість елементів щоб уникнути дублювання при зміні розмірів екрану.
      $marqueeInner.innerHTML = ''
      $childrenEl.forEach(($item) => {
        $marqueeInner.append($item)
      })

      // Перед дублюванням елементів додаємо стилі відступів та вносимо розміри елементів до динамічних данних.
      $childrenEl.forEach(($item) => {
        if (isVertical) {
          $item.style.marginBottom = `${spaceBetween}px`
        } else {
          $item.style.marginRight = `${spaceBetween}px`
          $item.style.flexShrink = 0
        }

        const sizeEl = getElSize($item, isVertical)

        sumSize += sizeEl + spaceBetween
        firstScreenVisibleSize += sizeEl + spaceBetween
        initialSizeElements += sizeEl + spaceBetween
        counterDublicateElements += 1

        return sizeEl
      })

      const $multiplyWidth = $parentNodeWidth * 2 + initialSizeElements

      // Дублюємо елементи за необхідності.
      for (; sumSize < $multiplyWidth; index += 1) {
        if (!$childrenEl[index]) index = 0

        const $cloneNone = $childrenEl[index].cloneNode(true)
        const $lastElement = $marqueeInner.children[index]

        $marqueeInner.append($cloneNone)

        sumSize += getElSize($lastElement, isVertical) + spaceBetween

        if (
          firstScreenVisibleSize < $parentNodeWidth ||
          counterDublicateElements % initialElementsLength !== 0
        ) {
          counterDublicateElements += 1
          firstScreenVisibleSize +=
            getElSize($lastElement, isVertical) + spaceBetween
        }
      }

      // Додаємо базові стилі враховуючи обчислені значення ширин елементів.
      setBaseStyles(firstScreenVisibleSize)
    }

    // Функція ініціалізації.
    const init = () => {
      addDublicateElements()
      animation()
      initEvents()
    }

    // Функція перезапуску анімації при зміні розмірів вьюпорта.
    const onResize = () => {
      head.querySelector(`.${animName}`)?.remove()
      init()
    }

    // Функція паузи при наведенні миші.
    const onChangePaused = (e) => {
      const { type, target } = e

      target.style.animationPlayState =
        type === 'mouseenter' ? 'paused' : 'running'
    }

    onWindowResize(onResize)
  })
}

marquee()
