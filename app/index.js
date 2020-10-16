// ================================
// START YOUR APP HERE
// ================================

/*

  KEN: Do not modify `calculateWinner` function.

  Use 'calculateWinner' function to determine if there is a winner.

  Pass in an array of 'X', 'O'.

  EX 1)

  const squares = [
    null, null, null,
    null, 'X', null,
    null, null, 'O',
  ];

  const result = calculateWinner(squares);
  console.log(result); // null

  EX 2)

  const squares = [
    null, 'O', 'O',
    'X', 'X', 'X',
    null, 'O', 'O',
  ];

  const result = calculateWinner(squares);
  console.log(result); // 'X'

 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];  // 알아보기! 비구조화 할당?
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

/*

  KEN: Your code starts below..

 */

const startBtn = document.querySelector(".startBtn");
const boxsNodeList = document.querySelectorAll(".board__box");
const boxsArray = Array.from(boxsNodeList);
const turnTeller = document.querySelector(".turnTeller");
const winnerTeller = document.querySelector(".winnerTeller");
const tipTeller = document.querySelector(".tipTeller");
const gameStatus = document.querySelector(".gameStatus");
const gameStatus__winner = document.querySelector(".gameStatus__winner");

const marks = {
  O :"⚫",
  X :"⚪",
}

let arrayOfO = [];
let arrayOfX = [];
let squares = [
  null, null, null,
  null, null, null,
  null, null, null,
];

function getTextsForTurnAndWin( turn, what = "차례" ){ //함수명.. 어케하면 좋을까요?
  turn = marks[turn] || null;
  return turn ? `${turn}의 ${what}입니다.` : "무승부 입니다.";
}

function paintContent(teller, what){
  teller.textContent = what;
}

function resetBoard(){
  arrayOfO = [];
  arrayOfX = [];
  squares = [
    null, null, null,
    null, null, null,
    null, null, null,
  ];

  boxsArray.map(e => paintContent(e, null));
  paintContent(winnerTeller, null);
  paintContent(tipTeller, "경기시작");
  paintContent(turnTeller, getTextsForTurnAndWin("O"));

  gameStatus.style.display = "block";
  gameStatus__winner.style.display = "none";
}

function gameOver(){
  boxsArray.map(e=> e.removeEventListener("click", handleClick));
  paintContent(tipTeller, "ReStart로 다시 도전하세YO");
}

function paintBox(targetBox, turn){
  let arrayOfTurn = turn === "O" ? arrayOfO : arrayOfX;
  arrayOfTurn.push(targetBox.id);
  squares[targetBox.id] = turn;
  paintContent(targetBox, marks[turn]);
  paintContent(turnTeller, getTextsForTurnAndWin(turn === "O" ? "X" : "O"));
}

function paintDraw(){
  paintContent(winnerTeller, getTextsForTurnAndWin("무승부"));
  paintContent(turnTeller, null);
  gameStatus__winner.style.display = "block";
  return true;
}

function getResult(){
  const result = calculateWinner(squares);

  if(result){
    gameStatus__winner.style.display = "block";
    paintContent(winnerTeller,  getTextsForTurnAndWin(result,"승리"));
    paintContent(turnTeller, null);
    gameOver();
    return;
  }

  const isDraw = squares.indexOf(null) === -1 ? true : false;
  isDraw && paintDraw() && gameOver();
}

function getTip(isOccupied){
  return isOccupied ? "딴대놔라" : (tipTeller.textContent === "딴대놔라") ? "잘했어YO" : null;
}

function getIsOccupied(targetId){
  return squares[targetId] ? true : false;
}

function handleClick(e){
  const targetId = e.target.id;
  const isOccupied = getIsOccupied(targetId);
  paintContent(tipTeller, getTip(isOccupied));

  if(isOccupied){
    return;
  }

  const targetBox = document.getElementById(`${targetId}`); // document.querySelector(`#${targetId}`) 는 안됨. 알아보기.
  const whosTurn = (arrayOfO.length === arrayOfX.length) ? "O" : "X";
  paintBox(targetBox, whosTurn);
  getResult();
}

function gameStart(){
  boxsArray.map(e=> e.addEventListener("click", handleClick));
  resetBoard();
}

function handleStartBtn(e){
  gameStart();
  paintContent(startBtn, "ReStart");
}

function init(){
  startBtn.addEventListener("click", handleStartBtn);
}

init();
