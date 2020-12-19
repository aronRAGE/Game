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
let started = false
const gameOptions = {
    colors: ['red', 'gold', 'green', 'blue', 'purple'],
    size: 100,
    fieldWidth: 1000,
    fieldHeight: 500,
    minBlocks: 3,
    maxBlocks: 9,
    time: 60000,
    map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
}

field.style.height = `${gameOptions.fieldHeight}px`
field.style.width = `${gameOptions.fieldWidth}px`



startBtn.addEventListener('click', ev => {
    if (!started) {
        started = true
        createGameTimer(gameOptions)
        pointCounter.value = counter
        for (let i = 0; i < getRandomIntInclusive(gameOptions.minBlocks, gameOptions.maxBlocks); i++) {
            field.append(createBlock(gameOptions))
        }
    }
})

newGameBtn.addEventListener('click', ev => {
    if (started) {
        started = false
        counter = 0
        pointCounter.value = counter
        clearTimeout(gameTimerId)
        gameOptions.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        gameOptions.positions = []
        field.innerHTML = ''
        timer.value = '--:--'
    }
})



field.addEventListener('click', event => {
    if (event.target.classList.contains('block')) {
        gameOptions.map[event.target.dataset.row][event.target.dataset.column] = 0
        event.target.remove()
        counter++
        pointCounter.value = counter
        for (let i = 0; i < getRandomIntInclusive(1, 2); i++) {
            if (field.children.length < gameOptions.maxBlocks) {
                field.append(createBlock(gameOptions))
            }
        }
    }
})



function createBlock(options) {
    const block = document.createElement('div')
    const position = createPosition(options.map)

    block.style.top = `${position.row * options.size}px`
    block.style.left = `${position.column * options.size}px`
    block.dataset.row = position.row
    block.dataset.column = position.column
    block.style.width = `${options.size}px`
    block.style.height = `${options.size}px`
    block.style.backgroundColor = options.colors[getRandomIntInclusive(0, options.colors.length - 1)]
    block.classList.add('block')

    return block
}


function createPosition(map) {
    let rowNumber = getRandomIntInclusive(0, map.length - 1)
    let columnNumber = getRandomIntInclusive(0, map[rowNumber].length - 1)

    if (!map[rowNumber][columnNumber]) {
        map[rowNumber][columnNumber] = 1
        return { row: rowNumber, column: columnNumber }
    } else {
        for (let i = 0; i < map.length; i++) {
            const row = map[i];
            for (let y = 0; y < row.length; y++) {
                const column = row[y];
                if (!column) {
                    map[i][y] = 1
                    return { row: i, column: y }
                }
            }
        }
        
    }

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
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]