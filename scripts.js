const gameContainer = document.querySelector('.gameContainer')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const startButton = document.querySelector('.start')
const player1Score = document.querySelector('.player1score')
const player2Score = document.querySelector('.player2score')
const playAgainButton = document.querySelector('.restart')
const goesFirst = document.querySelector('.goesFirst')
const cpuBtn = document.querySelector('.cpu')

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
    let cpu;

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
            cpu = false
        }   
        
        for(let i =0;i<9;i++){
            Gameboard.getGameBoard()[i] = ''
        }
        
        if(player1.value === ''||player2.value === ''){       
            return alert('please enter Name')
        }else{
        players = [createPlayer(player1.value.toUpperCase(),"X"),createPlayer(player2.value.toUpperCase(),"0")]
        player1Score.innerHTML = players[0].name
        player2Score.innerHTML = players[1].name
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
                player1Score.innerHTML = `${players[currentPlayer].name} : ${playerOneScore} `
            }
            else if(currentPlayer===1){
                playerTwoScore+=1
                player2Score.innerHTML = `${players[currentPlayer].name} : ${playerTwoScore} `
            }
        }
        else if(checkForTie(Gameboard.getGameBoard())){
            gameOver = true;
            
        }else
        gameOver = false
        currentPlayer = currentPlayer === 0 ? 1 : 0;

            ///////////////////////////////////////////
        if(cpu && currentPlayer === 1 && gameOver === false){
            
            gameOver = false;
            for(let i =0;i<9;i++){
                let randomNumb = Math.floor(Math.random()*9)
                console.log(randomNumb)
                if(Gameboard.getGameBoard()[randomNumb]=== ''){
                    Gameboard.update(randomNumb, '0')
                    break
                }

            }
            
            if(CheckForWin(Gameboard.getGameBoard())){
                
                displayWinner(players[currentPlayer].name)
                if(currentPlayer===0){
                    playerOneScore+=1
                    player1Score.innerHTML = `${players[currentPlayer].name} : ${playerOneScore} `
                }
                else if(currentPlayer===1){
                    playerTwoScore+=1
                    player2Score.innerHTML = `${players[currentPlayer].name} : ${playerTwoScore} `
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

    const cpuPlayer = ()=>{
        cpu = true;
        player2.value = "AI"
        Game.start()
    }

    

    const displayWinner = (winnerName)=>{
        let winnerBanner = document.createElement('div')
            document.querySelector('.wrapper').appendChild(winnerBanner)
            winnerBanner.innerHTML = `${winnerName} has Won The Game `
            winnerBanner.classList.add('winnerBanner')
            setTimeout(function() {
                winnerBanner.classList.add('fadeIn')
              }, 300);
    }

    return {
        start,handleClick,playAgain,cpuPlayer
        
    }
})();


startButton.addEventListener('click',() =>{
    Game.start()
    
})

playAgainButton.addEventListener('click',()=>{
    Game.playAgain()

})

cpuBtn.addEventListener('click', ()=>{

    Game.cpuPlayer()
    
})


 