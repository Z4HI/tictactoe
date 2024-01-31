const gameContainer = document.querySelector('.gameContainer')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const startButton = document.querySelector('.start')
const player1Score = document.querySelector('.player1score')
const player2Score = document.querySelector('.player2score')
const playAgainButton = document.querySelector('.restart')
const goesFirst = document.querySelector('.goesFirst')
const cpuBtn = document.querySelector('.cpu')
const cpuHardBtn = document.querySelector('.cpuHard')
let cpu;
let cpuH;
const Gameboard = (()=>{

let gameboard = ["","","","","","","","",""]

function render(){
    
   let boardHTML = ""

   gameboard.forEach((square,index)=>{
    boardHTML+= `<div class="square" id = "${index}">${square}</div>`
   })
    gameContainer.innerHTML = boardHTML; 
    const squares = document.querySelectorAll('.square')
    squares.forEach((square)=>{
        square.addEventListener("click", Game.handleClick)
    })

}

const update = (index,value)=>{
    
    gameboard[index] = value
    
    render()
}
const getGameBoard = ()=> {
    return gameboard
}

return {
    render,update,getGameBoard
}

})();

const createPlayer = (name,mark)=>{
    
    this.name = name
    this.mark = mark
    return{
        name,mark
    }
}

const Game = (()=>{
    let players = []
    let currentPlayer; 
    let gameOver;
    let playerOneScore = 0
    let playerTwoScore = 0
    

    const start = ()=>{
        
        let winnerBanner = document.querySelector('.winnerBanner')
        if(winnerBanner){
        winnerBanner.classList.remove('fadeIn')
        setTimeout(function() {
            document.querySelector('.wrapper').removeChild(winnerBanner)
          }, 200);
                
            players = []
            playerOneScore = 0
            playerTwoScore = 0
            cpu = false;
            cpuH = false;
        }   
        
        for(let i =0;i<9;i++){
            Gameboard.getGameBoard()[i] = ''
        }
        
        if(player1.value === ''||player2.value === ''){       
            return alert('please enter Name')
        }else{
        players = [createPlayer(player1.value.toUpperCase(),"X"),createPlayer(player2.value.toUpperCase(),"0")]
        
        player1Score.innerHTML = '<i class="fa-solid fa-user"></i>&nbsp;' + players[0].name
        player2Score.innerHTML = '<i class="fa-solid fa-user"></i>&nbsp;' + players[1].name
        if(cpu){
            player2Score.innerHTML= '<i class="fa-solid fa-robot"></i>'
        }
        if(cpuH){
            player2Score.innerHTML= '<i class="fa-solid fa-robot fa-bounce " style="color: #efe7e6;"></i>'
        }
        currentPlayer = 0
        goesFirst.innerHTML = players[currentPlayer].name + ' goes First'
        gameOver = false
        Gameboard.render()
        }
    }

    const handleClick = (event)=>{

        let index;
        if(gameOver){
            return;
        }
        
            index = parseInt(event.target.id)
            gameOver = false;

        if(Gameboard.getGameBoard()[index] !== ''){
            gameOver = false;
            return;
            }
        
        Gameboard.update(index,players[currentPlayer].mark) 

        ///-----------------------------------------------------//
        if(CheckForWin(Gameboard.getGameBoard())){
            gameOver = true;
            displayWinner(players[currentPlayer].name)
            if(currentPlayer===0){
                playerOneScore+=1
                player1Score.innerHTML = `${'<i class="fa-solid fa-user"></i>&nbsp;' + players[currentPlayer].name} : ${playerOneScore} `
            }
            else if(currentPlayer===1){
                playerTwoScore+=1
                player2Score.innerHTML = `${'<i class="fa-solid fa-user"></i>&nbsp;' + players[currentPlayer].name} : ${playerTwoScore} `
            }
        }
        else if(checkForTie(Gameboard.getGameBoard())){
            gameOver = true;
            
        }else
        gameOver = false
        currentPlayer = currentPlayer === 0 ? 1 : 0;

            ///////////////////////////////////////////
        if(cpu){
            setTimeout(function() {
                cpuMove()
              }, 300);
            
        }
        else if(cpuH){
            setTimeout(function() {
                cpuHardMove()
              }, 300);
        }
           
    }

    const playAgain = ()=>{
        gameOver = false
        if(cpu){
            currentPlayer = 0
        }
        goesFirst.innerHTML = players[currentPlayer].name + ' goes First'
        let winnerBanner = document.querySelector('.winnerBanner')
        if(winnerBanner){
        winnerBanner.classList.remove('fadeIn')
        setTimeout(function() {
            document.querySelector('.wrapper').removeChild(winnerBanner)
          }, 200);
        }
        for(let i =0;i<9;i++){
            Gameboard.getGameBoard()[i] = ''
        }
        Gameboard.render()
    }

    const CheckForWin = (board)=>{ 
        
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i =0;i<winningCombinations.length;i++){
            
            const [a,b,c] = winningCombinations[i]
            if(board[a] && board[a]===board[b]&&board[a]===board[c]){
                square = document.getElementById(`${a}`)
                square2 = document.getElementById(`${b}`)
                square3 = document.getElementById(`${c}`)

                setTimeout(function() {
                    square.style.backgroundColor = 'rgba(255, 15, 187, 0.428)'
                    square.style.textShadow = '0 0 5px #FFF, 0 0 1px #FFF'
                    square2.style.backgroundColor = 'rgba(255, 15, 187, 0.428)'
                    square2.style.textShadow = '0 0 5px #FFF, 0 0 1px #FFF'
                    square3.style.backgroundColor = 'rgba(255, 15, 187, 0.428)'
                    square3.style.textShadow = '0 0 5px #FFF, 0 0 1px #FFF'
                  }, 100);
                
                return true;
            }
        }
        return false;
    }

    const checkForTie = (board)=>{

        if(board.every((cell) => cell !== '')) {
        let winnerBanner = document.createElement('div')
            document.querySelector('.wrapper').appendChild(winnerBanner)
            winnerBanner.innerHTML = `TIE `
            winnerBanner.classList.add('winnerBanner')
            setTimeout(function() {
                winnerBanner.classList.add('fadeIn')
              }, 500);
              return true;
            }
            return false;
    }

    const cpuPlayer = (value)=>{
        if(value === '2'){
            cpu = true;
            cpuH = false;
            player2.value = "EASY AI"
            Game.start()
        }
        else if(value === '3'){
            cpuH = true;
            cpu = false;
        player2.value = "HARD AI"
        Game.start()
        }
        
        
    }

    const cpuMove = ()=>{
        if(gameOver === false){
            for(let i =0;i<Infinity;i++){
                let randomNumb = Math.floor(Math.random()*9)
                if(Gameboard.getGameBoard()[randomNumb] === ''){
                    Gameboard.update(randomNumb, players[currentPlayer].mark)
                    break;
                }
            }
            if(CheckForWin(Gameboard.getGameBoard())){
                displayWinner(players[currentPlayer].name)
                if(currentPlayer===0){
                    playerOneScore+=1
                    player1Score.innerHTML = `${ players[currentPlayer].name} : ${playerOneScore} `
                }
                else if(currentPlayer===1){
                    playerTwoScore+=1
                    player2Score.innerHTML = `${'<i class="fa-solid fa-robot"></i>&nbsp;' +players[currentPlayer].name} : ${playerTwoScore} `
                }
                gameOver = true;
            }
            else if(checkForTie(Gameboard.getGameBoard())){
                gameOver = true;
            }else
            gameOver = false
            currentPlayer = currentPlayer === 0 ? 1 : 0;    
        }
    }   
    
    const cpuHardMove = ()=>{
        if(gameOver === false){
        ////minimax
            if(CheckForWin(Gameboard.getGameBoard())){
                displayWinner(players[currentPlayer].name)
                if(currentPlayer===0){
                    playerOneScore+=1
                    player1Score.innerHTML = `${players[currentPlayer].name} : ${playerOneScore} `
                }
                else if(currentPlayer===1){
                    playerTwoScore+=1
                    player2Score.innerHTML = `${`<i class="fa-solid fa-robot fa-bounce " style="color: #efe7e6;"></i>&nbsp;` + players[currentPlayer].name} : ${playerTwoScore} `
                }
                gameOver = true;
            }
            else if(checkForTie(Gameboard.getGameBoard())){
                gameOver = true;
            }else
            gameOver = false
            currentPlayer = currentPlayer === 0 ? 1 : 0;    
        }
    } 

    const displayWinner = (winnerName)=>{
        let winnerBanner = document.createElement('div')
            document.querySelector('.wrapper').appendChild(winnerBanner)
            winnerBanner.innerHTML = `${winnerName} has Won The Game `
            winnerBanner.classList.add('winnerBanner')
            setTimeout(function() {
                winnerBanner.classList.add('fadeIn')
              }, 600);
    }

    return {
        start,handleClick,playAgain,cpuPlayer
        
    }
})();


startButton.addEventListener('click',() =>{
    if(cpu){
        player2.value = ''
        cpu = false
    }
    Game.start()
    
})

playAgainButton.addEventListener('click',()=>{
    Game.playAgain()

})

cpuBtn.addEventListener('click', ()=>{

    Game.cpuPlayer('2')
    
})

cpuHardBtn.addEventListener('click', ()=>{

    Game.cpuPlayer('3')
    
    
})


 

 