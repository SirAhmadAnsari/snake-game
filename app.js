// Variables
let PlayGround = document.getElementById('border');
let scoreBox = document.getElementById('scorebox');
let direction  = {x:0 , y:0};
let snakeArry = [{x:13 , y:15}];
let speed = 5;
let Score = 0;
let lastPaintTime = 0;
let Food = {x:14 , y:15}

// Game Function
function main(current_time){
window.requestAnimationFrame(main);
if ((current_time-lastPaintTime)/1000 < 1/speed) {
    return;
}
lastPaintTime=current_time;
// console.log(current_time);

gameEngine();

}

 
function isCollide(snake) {

    for (let i = 1; i < snakeArry.length; i++) {
     if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
         
         return true;
     }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
     {
         
         return true ;
     }
 }

function gameEngine(){
    // Updating the Snake array and food
 
    if(isCollide(snakeArry)){
        direction  = {x:0 , y:0}; 
        alert(`Game is over "PRESS ANY KEY TO PLAY AGAIN"`);
        
        //  Properly reset the snake array
        snakeArry = [{x:13 , y:15}];
    
        // Reset direction and score
        direction = {x: 0, y: 0};
        Score = 0;
    }

    // if snake eat food then increament score and generate food
    
    if (snakeArry[0].y===Food.y && snakeArry[0].x===Food.x) {
        
        snakeArry.unshift({ x:snakeArry[0].x + direction.x , y:snakeArry[0].y + direction.y }) ;
        let a = 2;
        let b = 16;
        Food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())};
        Score ++;
        scoreBox.innerHTML='Score '+Score;
    };

    // moving the snake 
 
    for (let i = snakeArry.length - 2 ; i >=0 ; i--) {
        snakeArry[i+1]={...snakeArry[i]};
    }
    snakeArry[0].x += direction.x;
    snakeArry[0].y += direction.y;


    // Displaying Snake and Food
    PlayGround.innerHTML="";
    snakeArry.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index===0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
       
        PlayGround.appendChild(snakeElement);
    });
  //food
  
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart=Food.y;
    FoodElement.style.gridColumnStart=Food.x;
    FoodElement.classList.add('food');
    border.appendChild(FoodElement);

 
}






//Game logic
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
    let newDirection = { x: 0, y: 0 };

    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 1) return; // Prevent moving down if going up
            newDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === -1) return; // Prevent moving up if going down
            newDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 1) return; // Prevent moving right if going left
            newDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === -1) return; // Prevent moving left if going right
            newDirection = { x: 1, y: 0 };
            break;
    }

    // Update direction only if it's not an opposite move
    direction = newDirection;
});


// window.addEventListener('keydown', (e) => {
//     direction = { x: 0, y: 1 }; // Game started

//     switch (e.key) {
//         case "ArrowUp":
//             console.log("ArrowUp is pressed");

//             direction.x = 0;
//             direction.y = -1;

//             break;

//         case "ArrowDown":
//             console.log("ArrowDown is pressed");

//             direction.x = 0;
//             direction.y = 1;
            

//             break;

//         case "ArrowLeft":
//             console.log("ArrowLeft is pressed");

//             direction.x = -1;
//             direction.y = 0;
          

//             break;

//         case "ArrowRight":
//             console.log("ArrowRight is pressed");

//             direction.x = 1;
//             direction.y = 0;
            

//             break;

//         default:
//             break;
//     }
// });