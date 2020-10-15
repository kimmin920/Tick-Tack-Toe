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

//  ox 한번 등록되면 덮혀지지않게 하기

const startBtn = document.querySelector(".startBtn");
const boxsNodeList = document.querySelectorAll(".board__box");
const boxsArray = Array.from(boxsNodeList);
const turnTeller = document.querySelector(".turnTeller");
const winnerTeller = document.querySelector(".winnerTeller");
const tipTeller = document.querySelector(".tipTeller");

let arrayOfO = [];
let arrayOfX = [];
let squares = [
  null, null, null,
  null, null, null,
  null, null, null,
];
function resetBoard(){
 arrayOfO = [];
 arrayOfX = [];
 squares = [
  null, null, null,
  null, null, null,
  null, null, null,
];
  boxsArray.map(e => e.textContent = "");
  winnerTeller.textContent = "";
  tipTeller.textContent = "경기 시작!";
  turnTeller.textContent = "O";
//확실하게 이게 전역객체를 조작 하는지?
}
function gameStart(){
  boxsArray.map(e=> e.addEventListener("click", handleClick));
  resetBoard();
}

function gameOver(){
  boxsArray.map(e=> e.removeEventListener("click", handleClick));
  tipTeller.textContent = "ReStart 버튼으로 다시 도전해";
}

function paintBox(targetBox){
  const oMark = "⭕";
  const xMark = "❌";

  if(arrayOfO.length === arrayOfX.length){
    targetBox.textContent = oMark;
    arrayOfO.push(targetBox.id);
    squares[targetBox.id] = "O";
    turnTeller.textContent = "X";
  }else{
    targetBox.textContent = xMark;
    arrayOfX.push(targetBox.id);
    squares[targetBox.id] = "X";
    turnTeller.textContent = "O";
  }

  const result = calculateWinner(squares);
  if(result){
    winnerTeller.textContent = result;
    turnTeller.textContent = "";
    gameOver();
  }
}

function handleClick(e){
  const targetId = e.target.id;

  if(squares[targetId]){
    tipTeller.textContent = "딴대 놔라";
    return;
  }
  if(tipTeller.textContent === "딴대 놔라"){
    tipTeller.textContent = "잘했어";
  }else{
    tipTeller.textContent = "";
  }
  const targetBox = document.getElementById(`${targetId}`); // document.querySelector(`#${targetId}`) 는 안됨. 알아보기.
  paintBox(targetBox);
}
function handleStartBtn(e){
  gameStart();
  startBtn.textContent = "ReStart";
}
startBtn.addEventListener("click", handleStartBtn);

