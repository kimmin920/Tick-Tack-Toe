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
    const [a, b, c] = lines[i];  // 알아보기! 비구조화 할당? 이 맞나요? 찾아보고 있는데 이해가 잘 안되네욥..
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
const board = document.querySelector(".board");
const boxsNodeList = document.querySelectorAll(".board__box");
const boxsArray = Array.from(boxsNodeList);
const turnTeller = document.querySelector(".turnTeller");
const winnerTeller = document.querySelector(".winnerTeller");
const tipTeller = document.querySelector(".tipTeller");
const gameStatus = document.querySelector(".gameStatus");
const gameStatus__winner = document.querySelector(".gameStatus__winner");
const gameStatus__turn = document.querySelector(".gameStatus__turn");
const gameStatus__tip = document.querySelector(".gameStatus__tip");

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
  return turn ? `${turn}의 ${what}입니다` : "무승부 입니다";
}

function paintContent(teller, what){
  teller.textContent = what;
}

function displayChanger(element, toWhat){
  element.style.display = toWhat;
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
  paintContent(tipTeller, "시작! 선빵필승");
  paintContent(turnTeller, getTextsForTurnAndWin("O"));

  displayChanger(gameStatus, "block");
  displayChanger(gameStatus__turn, "block");
  displayChanger(gameStatus__winner, "none");
}

function gameOver(){
  // boxsArray.map(e=> e.removeEventListener("click", handleClick));
  board.removeEventListener("click", handleClick);
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
  displayChanger(gameStatus__winner, "block");
  displayChanger(gameStatus__turn, "none");
  return true;
}

function getResult(){
  const result = calculateWinner(squares);

  if(result){
    displayChanger(gameStatus__turn, "none");
    displayChanger(gameStatus__winner, "block");
    paintContent(winnerTeller, getTextsForTurnAndWin(result, "승리"));
    paintContent(turnTeller, null);
    gameOver();
    return;
  }

  const isDraw = squares.indexOf(null) === -1 ? true : false;
  isDraw && paintDraw() && gameOver();
}

function getTip(isOccupied){
  return isOccupied ? "딴대놔라" : (tipTeller.textContent === "딴대놔라") ? "잘했어YO!" : null;
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

  // document.querySelector(`#${targetId}`);
  // 위는 오류가 나서 찾아봤더니 #숫자는 쓸수 없다는 것을 알게되었습니당. 이유는 그냥 셀렉터의 특성이라고 하던데..맞나요?
  // document.querySelector("[id='1']") 처럼 써야 한다고 해서 아래 코드처럼 string화 해서 썼습니당.
  // const targetBox = document.querySelector(`[id=${JSON.stringify(targetId)}]`);
  // 또 다른 방법도 찾긴 했씁니다.(아래)
  // const targetBox = document.querySelector(`#${CSS.escape(targetId)}`);

  // querySelector로 통일하기 위해서 저렇게 했는데요! 더 좋은 방법이 있을까요?
  // 아님 그냥 아래처럼 통일성이 없어도 getElmentById를 쓰는게 나을까요?
  // const targetBox = document.getElementById(`${targetId}`);

  const targetBox = document.querySelector(`[id=${JSON.stringify(targetId)}]`);
  const whosTurn = (arrayOfO.length === arrayOfX.length) ? "O" : "X";
  paintBox(targetBox, whosTurn);
  getResult();
}

function gameStart(){
  // boxsArray.map(e=> e.addEventListener("click", handleClick));
  board.addEventListener("click", handleClick);
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
