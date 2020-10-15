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

const boxsNodeList = document.querySelectorAll(".board__box");
const boxsArray = Array.from(boxsNodeList);

let arrayOfO = [];
let arrayOfX = [];
let squares = [
  null, null, null,
  null, null, null,
  null, null, null,
];

function paintBox(targetBox){
  const oMark = "⭕";
  const xMark = "❌";
  if(arrayOfO.length === arrayOfX.length){
    targetBox.textContent = oMark;
    arrayOfO.push(targetBox.id);
    console.log(arrayOfO);
    squares[targetBox.id] = "O";
  }else{
    targetBox.textContent = xMark;
    arrayOfX.push(targetBox.id);
    console.log(arrayOfX);
    squares[targetBox.id] = "X";
  }
  console.log(squares);
  const result = calculateWinner(squares);
  result && console.log(`winner is ${result}`);
}

function handleClick(e){
  const targetId = e.target.id;
  const targetBox = document.getElementById(`${targetId}`); // document.querySelector(`#${targetId}`) 는 안됨. 알아보기.
  paintBox(targetBox);
}


boxsArray.map(e=> e.addEventListener("click", handleClick));


