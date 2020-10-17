const betagoBtn = document.querySelector(".versusBtn");

function getBoxForBetago(){
  let betagoObj = {
    target: {},
  };

  do {
    randomNum = Math.floor(Math.random()*9);
  }while(squares[randomNum]);

  betagoObj.target.id = randomNum;
  return betagoObj;
}

function handleBetagoClick(e){
  isBetagoOn = isBetagoOn ? false : true;
  if(isBetagoOn){
    paintContent(betagoBtn, "배타고 ON");
    betagoBtn.style.backgroundColor = "rgb(248, 255, 143)";
    betagoBtn.style.color = "rgb(235, 147, 135)";
  }else{
    paintContent(betagoBtn, "배타고 OFF")
    betagoBtn.style.backgroundColor = "grey";
    betagoBtn.style.color = "white";
  }
}

betagoBtn.addEventListener("click", handleBetagoClick);