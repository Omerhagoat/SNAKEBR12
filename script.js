
const grid=document.getElemendById('grid');
let squares = [];
let currentSnake = [0,1,2];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;
function createGrid(){
            
    for(let i=0; i<400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}


createGrid();   
