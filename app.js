const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
let timeEl = document.querySelector('#time')
let time = 0
let score = 0
let interval

const colors = [
  'e26103',
  '3ea3da',
  '238899',
  'ecf0f3',
  '99b0d6',
  'fbc77d',
  '7d9777',
]

startBtn.addEventListener('click', e => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
  const target = e.target
  if (target.classList.contains('time-btn')) {
    time = parseInt(target.getAttribute('data-time'))
    time = time < 10 ? `0${time}` : time
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', e => {
  const target = e.target
  if ( target.classList.contains('circle') ) {
    score++
    target.remove()
    createRandomCircle()
  }
})

function startGame() {
  interval = setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
    clearInterval(interval)
  } else {

    let current = --time
    if (current < 10 ) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}


function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
  const circle =document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()

  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')

  const startColor = getRandomColor()
  const randomDeg = getRandomNumber(0,360)
  const intermediateColor = getRandomColor()
  const randomPercentage = getRandomNumber(10, 90)
  const endColor = getRandomColor()

  circle.style.background = `linear-gradient(${randomDeg}deg, #${startColor} 0%, #${intermediateColor} ${randomPercentage}%, #${endColor} 100%)`
  circle.style.boxShadow = `0 0 10px #${intermediateColor}`

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`

  circle.style.top = `${x}px`
  circle.style.left = `${y}px`

  board.append(circle)
}

function getRandomColor() {
  const colorIndex = Math.floor( Math.random() * colors.length )
  return colors[colorIndex]
}

function getRandomNumber(min, max) {
  return Math.round( Math.random() * ( max - min ) + min )
}