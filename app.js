const state = {
    board: [0,0,0,0,0,0,0,0,0],
    winner : false,
    playerTurn : true
}

const cells = document.getElementsByClassName('cell');

const player1Button = document.getElementById('player1Button');
const player1DisplayName = document.getElementById('playerName1');
const player2Button = document.getElementById('player2Button');
const player2DisplayName = document.getElementById('playerName2');
const playComputerButton = document.getElementById('playComputerButton');
const winnerMesasge = document.getElementById('winnerMessage');
const resetButton = document.getElementById('resetButton');


//function adds rows and checks for winner
const addrows  = () => {
    let rows = [8];
    //horizontals
    rows[0] = state.board[0] + state.board[1] + state.board[2];
    rows[1] = state.board[3] + state.board[4] + state.board[5];
    rows[2] = state.board[6] + state.board[7] + state.board[8];
    //verticals
    rows[3] = state.board[0] + state.board[3] + state.board[6];
    rows[4] = state.board[1] + state.board[4] + state.board[7];
    rows[5] = state.board[2] + state.board[5] + state.board[8];
    //diagonals
    rows[6] = state.board[0] + state.board[4] + state.board[8];
    rows[7] = state.board[2] + state.board[4] + state.board[6];

    for(let i = 0; i < 8; i++){
        if (rows[i] === 3){
            winnerMessage.innerText = "Player 1 Wins! (click here to play again)";
            state.winner = true;
        }
        else if (rows[i] === 12){
            winnerMessage.innerText = "Player 2 Wins! (click here to play again)";
            state.winner = true;
        }
    }    
}

//adds player 1 name
player1Button.addEventListener('click', () => { 
    const player1Input = document.getElementById('player1Input').value;   
    player1DisplayName.innerText = player1Input;
    document.getElementById('player1Input').style.display = 'none';
    document.getElementById('player1Button').style.display = 'none';
})
//player 2 name
player2Button.addEventListener('click', () => { 
    const player2Input = document.getElementById('player2Input').value;   
    player2DisplayName.innerText = player2Input;
    document.getElementById('player2Input').style.display = 'none';
    document.getElementById('player2Button').style.display = 'none';
    document.getElementById('playComputerButton').style.display = 'none';
    
})
//starts the computer playing
playComputerButton.addEventListener('click', () => {
    //hide everything
    player2DisplayName.innerText = "Computer";
    document.getElementById('player2Input').style.display = 'none';
    document.getElementById('player2Button').style.display = 'none';
    document.getElementById('playComputerButton').style.display = 'none';

    //capture player input and do a random move if its computer turn
    for(let i = 0; i < cells.length;i++){
        if(state.winner === true)
            break;

        cells[i].addEventListener('click', () => {
            if (state.playerTurn === true && state.board[i] === 0){
                cells[i].innerText = 'O';
                state.playerTurn = false;
                state.board[i] = 1;
                addrows();
            }       
        })
        //gets random number until there is a move to make
        if (state.playerTurn === false){
            let random = 4;
            while (state.board[random] === 1 || state.board[random] === 4){
                random = math.random(9);             
            }
            cells[random].innerText = 'X';
            state.playerTurn = true;
            state.board[random] = 4;
            addrows();            
        }
    }
    
})
//changes tiles depending on clicks and adjusts whos turn it is
for(let i = 0; i < cells.length;i++){
    cells[i].addEventListener('click', () => {
        if (state.playerTurn === true && state.board[i] === 0 && state.winner === false){
            cells[i].innerText = 'O';
            state.playerTurn = false;
            state.board[i] = 1;
            addrows();
        }
        else if (state.playerTurn === false && state.board[i] === 0 && state.winner === false) {
            cells[i].innerText = 'X';
            state.playerTurn = true;
            state.board[i] = 4;
            addrows();
        }
    })
    if(state.winner === true)
        break;
}
//resets everything back if clicking on the bottom banner
resetButton.addEventListener('click', () => {
        document.getElementById('player1Input').style.display = 'initial';
        document.getElementById('player1Button').style.display = 'initial';
        document.getElementById('player2Input').style.display = 'initial';
        document.getElementById('player2Button').style.display = 'initial';
        document.getElementById('playComputerButton').style.display = 'initial';
        player1DisplayName.innerText = "Player 1";
        player2DisplayName.innerText = "Player 2";
        winnerMesasge.innerText = "Who will win?"
        for(let i = 0; i < cells.length; i++){
            cells[i].innerText = '?';
            state.board[i] = 0;
        }
        state.winner = false;
        state.playerTurn = true;
})


