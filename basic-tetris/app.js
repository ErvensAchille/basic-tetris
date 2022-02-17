const width = 10
const grid = document.querySelector('.grid')
// collect all divs in grid and turn them into an array. Now each div has a specific index number
let squares = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay = document.querySelector('#score');
const startBtn = document.getElementById('start-button')
let timerID

// The Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]
const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2 ,width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
]

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
 ]

 const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
 ]

const theTetrominoes = [lTetromino, oTetromino, iTetromino, zTetromino, tTetromino]

let currentPosition = 4
let currentRotation = 0

// randomly select tetromino and its first rotation

let random = Math.floor(Math.random() * theTetrominoes.length)
console.log(random);

let current = theTetrominoes[random][0]


// draw the first rotation in the first Tetromino
function draw(){
  current.forEach((index, i) => {
    squares[currentPosition + index].classList.add('tetromino')
  });
}

function undraw(){
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove('tetromino')
  });
}

// make the tetromino move down every second



function moveDown(){
  undraw()
  currentPosition += width
  draw()
  freeze()
}
// freeze function
function freeze () {
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // drop a new tetrimino
    random = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}

// assign functions to keyCodes
function control (e){
  if(e.keyCode === 37){
    moveLeft()
  }else if (e.keyCode === 38){
    rotate()
  }else if (e.keyCode === 39) {
    moveRight()
  }else if (e.keyCode === 40) {
    moveDown()
  }
}
// directions
document.addEventListener('keyup', control)

// move the tetromino right stop at isAtLeftEdge
// undraw squares that make up tetromino from current indexes
// define what right edge is
// if not by the edge tetrimino can move each square +1 down the array
// if squares in taken class push back a space in array making it seem like they have not moved at all
// redraw tetrimino in new position

// move the tetrimino left
function moveLeft(){
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if (!isAtLeftEdge) currentPosition -=1
  if (current.some(index => squares [currentPosition +
  index].classList.contains('taken'))){
    currentPosition += 1
  }

  draw()
}

// move the tetrimino right
function moveRight(){
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
  if (!isAtRightEdge) currentPosition +=1
  if (current.some(index => squares [currentPosition +
  index].classList.contains('taken'))){
    currentPosition -= 1
  }

  draw()
}

// rotate
function rotate(){
  undraw()
  // move down to next item in array
  currentRotation ++
  if(currentRotation === current.length){  //if the current rotation gets to 4 make it go back to 0
    currentRotation = 0

  }
  current = theTetrominoes [random][currentRotation]
  draw()
}
// add functionality to button
startBtn = document.addEventListener('click', () => {
  if(timerID){
    clearInterval(timerID)
    timerID = null
  }else {
draw()
timerID = setInterval (moveDown, 500)
nextRandom = Math.floor(Math.Random() * theTetrominoes.length)
  }
});
