const betagoBtn = document.querySelector(".versusBtn");
const player2Board = document.querySelector(".player2");
const player2Text = document.querySelector(".player2Text");

function getBoxForBetago(){
  let betagoObj = {
    target: {
      dataset : {}
    },
  };

  do {
    randomNum = Math.floor(Math.random()*9);
  }while(squares[randomNum]);

  betagoObj.target.dataset.id = randomNum;
  return betagoObj;
}

function handleBetagoClick(e){
  isBetagoOn = isBetagoOn ? false : true;
  if(isBetagoOn){
    paintContent(betagoBtn, "배타고 ON");
    betagoBtn.style.backgroundColor = "rgb(248, 255, 143)";
    betagoBtn.style.color = "rgb(235, 147, 135)";

    // paintContent(player2Board, "배타고🚢(초급)"); textContent를 수정하니, 해당 div의 하위 div들이 사라지더라구요..
    // textContent는 text만 바꾼다고 이해했는데, 잘못 이해했나봐요. text만 바꾸고 내부 div는 안건드리는 방법이 있나요?

    paintContent(player2Text, "배타고🚢(초보)")
    player2Board.style["font-size"] = "35px";
  }else{
    paintContent(betagoBtn, "배타고 OFF")
    betagoBtn.style.backgroundColor = "grey";
    betagoBtn.style.color = "white";
    paintContent(player2Text, "백색이");
    player2Board.style["font-size"] = "3rem";
  }
}

betagoBtn.addEventListener("click", handleBetagoClick);