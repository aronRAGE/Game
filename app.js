const field = document.getElementById("game-field")
const startBtn = document.getElementById("startBtn")
const newGameBtn = document.getElementById("newGameBtn")
const pointCounter = document.getElementById("point-counter")
const timer = document.getElementById('timer')
let gameTimerId = null;
let counter = 0
const timeFormat = new Intl.DateTimeFormat(undefined, {
    minute: '2-digit',
    second: '2-digit'
})
const gameOptions = {
    colors: ['red', 'gold', 'green', 'blue', 'purple'],
    size: '100px',
    minBlocks:3,
    maxBlocks: 9,
    time: 60000
}





startBtn.addEventListener('click', ev => {
    createGameTimer(gameOptions)
    let addBlock = createBlock(gameOptions)
    pointCounter.value = counter
    field.append(addBlock)
})

newGameBtn.addEventListener('click', ev => {

    
})



field.addEventListener('click', event => {
    if (event.target.classList.contains('block')) {
        event.target.remove()
        counter++
        pointCounter.value = counter
    }
})
function createBlock(options) {
    const block = document.createElement('div')

    block.style.width = options.size
    block.style.height = options.size
    block.style.backgroundColor = options.colors[getRandomIntInclusive(0,options.colors.length - 1)]
    block.classList.add('block')

    return block
}



function createGameTimer(options) {
    clearTimeout(gameTimerId)
    let gameTime = options.time
    gameTimerId = setTimeout(function tick() {

        gameTime -= 1000

        timer.value = timeFormat.format(gameTime)

        if (gameTime > 0) {
            gameTimerId = setTimeout(tick, 1000);
        } else {
            alert('game over')
        }

    }, 0);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }



  const map = [
      [1,0,0],
      [0,1,0],
      [0,0,1]
  ]