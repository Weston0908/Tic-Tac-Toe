/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    let insertNum = parseInt(position);
        if (board[insertNum] == ' '){
            board[insertNum] = mark
        }
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {

    let drawBoard = {
        1: '1', 2: '2', 3: '3',
        4: '4', 5: '5', 6: '6',
        7: '7', 8: '8', 9: '9'
      };

    for (let i in drawBoard){
        if(board[i] != ' '){
            drawBoard[i] = board[i];
        }
    }

    console.log (' ' + drawBoard[1] + ' | ' + drawBoard[2] + ' | '+ drawBoard[3] + ' \n'
                     + '-----------\n ' 
                     + drawBoard[4] + ' | ' + drawBoard[5] + ' | '+ drawBoard[6] + ' \n'
                     + '-----------\n ' 
                     + drawBoard[7] + ' | ' + drawBoard[8] + ' | '+ drawBoard[9] + ' ');
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    let newPosition = parseInt(position);
    if((newPosition >=1 && newPosition <= 9) && (board[newPosition] == ' ')){
      return true;
    }
    return false;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let arr of winCombinations) {
        if (board[arr[0]] == player && board[arr[1]] == player && board[arr[2]] == player){
            return true;
        }
    } 
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let element in board){
        if (board[element] == ' ') {
            return false;
        }
    }
return true; 
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let input = prompt (' What is your input, player '+ player + ' ? ');
    while (!validateMove(input)){
        input = prompt ('Wrong input, please input again ');
    }
    markBoard (input, player);
    printBoard ();
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
    if ( checkWin (currentTurnPlayer) == true){
        console.log ('Congratulations ! Player ' + currentTurnPlayer + ' is the winner.')
        let userRequest = prompt ('Do you want to start a new game ? (Y/N) ');
        winnerIdentified = (userRequest == 'y' || userRequest == 'yes') ? false : true;
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
    }
    if (checkFull() == true){
        console.log ('It is a draw !');
        userRequest = prompt ('Do you want to start a new game ? (Y/N) ');
        winnerIdentified = (userRequest == 'y' || userRequest == 'yes') ? false : true;
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
    }
    currentTurnPlayer = (currentTurnPlayer == 'X') ? 'O' : 'X'
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
