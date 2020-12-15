const field = document.getElementById("game-field")
const startBtn = document.getElementById("startBtn")
const newGameBtn = document.getElementById("newGameBtn")
const pointCounter = document.getElementById("point-counter")
const timer = document.getElementById('timer')
let fieldWidth = field.scrollWidth
let fieldheight = field.scrollHeight
let gameTimerId = null;
let counter = 0
const timeFormat = new Intl.DateTimeFormat(undefined, {
    minute: '2-digit',
    second: '2-digit'
})
const gameOptions = {
    colors: ['red', 'gold', 'green', 'blue', 'purple'],
    size: 122,
    minBlocks:3,
    maxBlocks: 9,
    time: 0,
    blockPosition: 'absolute',
    top: null,
    left: null
}
console.log();
const fieldOptions = {
    fieldBorder:'1px solid #000',
    fieldHeight: "500px",
    fieldBorderRadius: '15px',
	fieldBackgroundColor: 'white',
    fieldPadding: '5px 15px',
    fieldPosition: 'relative'
}
    function GameField(options) {
        field.style.height = options.fieldHeight
        field.style.border = options.fieldBorder
        field.style.borderRadius = options.fieldBorderRadius
        field.style.backgroundColor = options.fieldBackgroundColor
        field.style.padding = options.fieldPadding
        field.style.position = options.fieldPosition
    }


    GameField(fieldOptions)



startBtn.addEventListener('click', ev => {
    gameOptions.time = 60000
    createGameTimer(gameOptions)
    counter = 0
    gameOptions.top = getRandomIntInclusive(5, fieldheight - gameOptions.size - 5) + 'px'
    gameOptions.left = getRandomIntInclusive(5, fieldWidth - gameOptions.size - 5) + 'px'
    let addBlock = createBlock(gameOptions)
    pointCounter.value = counter
    field.append(addBlock)
})

newGameBtn.addEventListener('click', ev => {
    counter = 0
    gameOptions.time = 0
    createGameTimer(gameOptions)
    pointCounter.value = counter
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

    block.style.width = options.size + 'px'
    block.style.height = options.size + 'px'
    block.style.backgroundColor = options.colors[getRandomIntInclusive(0,options.colors.length - 1)]
    block.style.position = options.blockPosition
    block.style.top = options.top
    block.style.left = options.left
    block.classList.add('block')
    let blocks = block  

    return blocks
}



function createGameTimer(options) {
    clearTimeout(gameTimerId)
    let gameTime = options.time
    gameTimerId = setTimeout(function tick() {


        timer.value = timeFormat.format(gameTime)

        if (gameTime > 0) {
            gameTime -= 1000
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