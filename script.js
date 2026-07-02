const grid=document.getElementById('grid');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 20;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;
function createBoard(){
    for(let i=0; i<400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
function endGame() {
    playGameOverSound();
    return clearInterval(timerId);
    
}

createBoard();   

function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2 , 1, 0];
    score=0; direction=1; intervalTime=200;
    scoreDisplay.textContent=score
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    generateApple();
    startMusic();
    timerId = setInterval(move, intervalTime);
}
function move(){
    const newHead = currentSnake[0]+direction;

    const hitBottom=(currentSnake[0]+20>=400 && direction === 20);
    const hitTop = (currentSnake[0]-20<0 && direction === -20);
    const hitRight = (currentSnake[0]%20 === 19 && direction === 1)
    const hitLeft = (currentSnake[0]%20 === 0 && direction === -1)
    const hitSelf = squares[currentSnake[0]+direction]?.classList.contains('snake');
    if (hitRight || hitBottom || hitTop || hitLeft || hitSelf) {
        return endGame();
    }
    const tail = currentSnake.pop();
    if(squares[newHead].classList.contains('apple')) {
        playEatSound();
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = score;
        generateApple();
    }
    squares[tail].classList.remove('snake');
      
    currentSnake.unshift(newHead);
    squares[newHead].classList.add('snake');
  
}
  document.addEventListener('touchstart', e=> {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches [0].screenY;
    }, false);
    document.addEventListener('touchend', e=> {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches [0].screenY;
        handleSwipe();
    }, false);
function handleSwipe(){
    const dx=touchEndX-touchStartX
    const dy= touchEndY-touchStartY
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if(Math.max(absDx, absDy) >30)
        if (absDx>absDy){
            if (dx > 0) changeDir(-1);
            else changeDir(1)
        } else {
            if (dy > 0)changeDir(20);
            else changeDir(-20)
        }
        
}
function generateApple(){
    do{
        appleIndex = Math.floor(Math.random()* squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}
generateApple();
function changeDir(newDir) {
    if (direction + newDir !== 0) {
        direction = newDir;
    }
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir (20);
    if (e.key === 'ArrowLeft') changeDir (-1);
    if (e.key === 'ArrowRight') changeDir (1); 
    
});

const bgMusic = new Audio('assets/music.mp3');
const eatSound = new Audio('assets/eat.mp3');
const gameOverSound = new Audio('assets/gameOver.mp3');



function playEatSound() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    eatSound.play();
}


function playGameOverSound() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    gameOverSound.play();
}

function startMusic() {
    bgMusic.pause();
    bgMusic.currentTime=0;
    bgMusic.play()
}
