const gameContainer = document.querySelector('.gameContainer')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const startButton = document.querySelector('.start')
const player1Score = document.querySelector('.player1score')
const player2Score = document.querySelector('.player2score')
const restartButton = document.querySelector('.restart')

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

    const start = ()=>{
        
        if(player1.value === ''||player2.value === ''){       
            return alert('please enter Name')
        }else{
        player1Score.innerHTML = player1.value  
        player2Score.innerHTML = player2.value 
        players = [createPlayer(player1.value,"X"),createPlayer(player2.value,"0")]
        currentPlayer = 0
        gameOver = false
        Gameboard.render()
        }
    }

    const handleClick = (event)=>{

        let index = parseInt(event.target.id)
        if(Gameboard.getGameBoard()[index] !== '')
        return;
        Gameboard.update(index,players[currentPlayer].mark)
        if(CheckForWin(Gameboard.getGameBoard())){
            gameOver = true;
            alert(`${players[currentPlayer].name} has Won The Game `)
        }
        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    const restart = ()=>{
        players = []
        player1.value = ''
        player2.value = ''
        player1Score.innerHTML = ''
        player2Score.innerHTML = ''
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

    return {
        start,handleClick,restart
        
    }
})();

startButton.addEventListener('click',() =>{

    Game.start()
    
})

restartButton.addEventListener('click',()=>{
    Game.restart()

})

