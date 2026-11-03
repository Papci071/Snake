for(i=0;i<10;i++){
    for(j=0;j<10;j++){
        let kratka = document.querySelector(`tr[id='${i}'] td.class-${j}, tr[id='${i}'] td:nth-child(${j + 1})`)
        if(i%2==0)
            if(j%2==0)
                kratka.style.backgroundColor = "#40D84A";
            else
                kratka.style.backgroundColor = "#f3e885";
        else if(j%2==0)
                kratka.style.backgroundColor = "#f3e885";
            else
                kratka.style.backgroundColor = "#40D84A";

    }
}


let SnakeLength
let SnakeDierction //r,l,u,d
let headPositionY
let headPositionX

let tailPositionY
let tailPositionX

let tailArray=[]

let gameStarted
let gameInterval

let fruit=null
let fruitX=null
let fruitY=null

function restart(){
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            document.querySelector(`tr[id='${i}'] td.class-${j}, tr[id='${i}'] td:nth-child(${j + 1})`).classList.remove('snake')
        }
    }
    headPositionY=4
    headPositionX=1
    tailPositionY=4
    tailPositionX=0
    gameStarted=false

    if(fruit!=null)
        fruit.classList.remove('fruit')

    tailArray.length = 0;
    tailArray.push([0,4])
    tailArray.push([1,4])
    
    SnakeLength=2
    SnakeDierction='r' //r,l,u,d
    renderSnake()
    tailPosition.classList.add("snake");
    
}
restart()

function renderSnake(){
    headPosition=document.querySelector(`tr[id='${headPositionY}'] td.class-${headPositionX}, tr[id='${headPositionY}'] td:nth-child(${headPositionX + 1})`);
    tailPosition=document.querySelector(`tr[id='${tailPositionY}'] td.class-${tailPositionX}, tr[id='${tailPositionY}'] td:nth-child(${tailPositionX + 1})`);
    headPosition.classList.add("snake");
}

function moveSnake(){
        switch(SnakeDierction){
        case 'r':
            headPositionX+=1
            if(headPositionX>9||snakeColisionCheck()){
                alert("Przeegrana!")
                restart()
                return;
            }
            if(snakeFruitCheck()){
                SnakeLength+=1
                newFruit()
            }
            break;
        case 'l':
            headPositionX-=1
            if(headPositionX<0||snakeColisionCheck()){
                alert("Przeegrana!")
                restart()
                return;
            }
            if(snakeFruitCheck()){
                SnakeLength+=1
                newFruit()
            }
            break;
        case 'u':
            headPositionY-=1
            if(headPositionY<0||snakeColisionCheck()){
                alert("Przeegrana!")
                restart()
                return;
            }
            if(snakeFruitCheck()){
                SnakeLength+=1
                newFruit()
            }
            break;
        case 'd':
            headPositionY+=1
            if(headPositionY>9||snakeColisionCheck()){
                alert("Przeegrana!")
                restart()
                return;
            }
            if(snakeFruitCheck()){
                SnakeLength+=1
                newFruit()
            }
            break;
        default:
            console.log("błędny SnakeDierction")

    }
    tailArray.push([headPositionX,headPositionY])
    MenageTail()
    renderSnake()
}

document.addEventListener("keydown", function (event) {
  switch(event.key){
    case 'ArrowDown':
        if(SnakeDierction!='u') SnakeDierction='d'
        break;
    case 's':
        if(SnakeDierction!='u') SnakeDierction='d'
        break;
    case 'ArrowUp':
        if(SnakeDierction!='d') SnakeDierction='u'
        break;
    case 'w':
        if(SnakeDierction!='d') SnakeDierction='u'
        break;
    case 'ArrowRight':
        if(SnakeDierction!='l') SnakeDierction='r'
        break;
    case 'd':
        if(SnakeDierction!='l') SnakeDierction='r'
        break;
    case 'ArrowLeft':
        if(SnakeDierction!='r') SnakeDierction='l'
        break;
    case 'a':
        if(SnakeDierction!='r') SnakeDierction='l'
        break;
    default:
        break;

  }
  if(!gameStarted) StartGame()
});

function snakeColisionCheck(){
    if(document.querySelector(`tr[id='${headPositionY}'] td.class-${headPositionX}, tr[id='${headPositionY}'] td:nth-child(${headPositionX + 1})`).classList.contains('snake'))
        return true;
    return false;
}

function StartGame(){
    gameStarted=true
    newFruit()
    gameInterval = setInterval(moveSnake, 700)
}




function MenageTail(){
    if(SnakeLength<tailArray.length){
        let TailToCutCordsXY =  tailArray.shift()
        let TailToCut = document.querySelector(`tr[id='${TailToCutCordsXY[1]}'] td.class-${TailToCutCordsXY[0]}, tr[id='${TailToCutCordsXY[1]}'] td:nth-child(${TailToCutCordsXY[0] + 1})`)
        TailToCut.classList.remove('snake')
    }
}



function newFruit(){
    if(fruit!=null)
    fruit.classList.remove('fruit')

    do{
    fruitX=Math.floor(Math.random() * 10)
    fruitY=Math.floor(Math.random() * 10)
    }while(tailArray.map(JSON.stringify).includes(JSON.stringify([fruitX, fruitY])))

    fruit = document.querySelector(`tr[id='${fruitY}'] td.class-${fruitX}, tr[id='${fruitY}'] td:nth-child(${fruitX + 1})`)
    fruit.classList.add('fruit')
}

function snakeFruitCheck(){
    if(document.querySelector(`tr[id='${headPositionY}'] td.class-${headPositionX}, tr[id='${headPositionY}'] td:nth-child(${headPositionX + 1})`).classList.contains('fruit'))
        return true;
    return false;
}