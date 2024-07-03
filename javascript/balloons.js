const colors = ["blue", "green", "red", "violet", "yellow"];
const windowWidth = window.innerWidth;
const body = document.body;
const windowHeight = window.innerHeight;
const score = document.querySelectorAll(".score");
let number = 0;
let total = 100;
let balloonCrt = 0;
let gameOver = false;
const popUp = document.querySelector(".pop-up");

function createBalloon() {
  let div = document.createElement("div");
  let random = Math.floor(Math.random() * colors.length);

  div.className = "balloon balloon-" + colors[random];

  random = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = random + "px";
  div.dataset.number = balloonCrt;
  balloonCrt++;

  body.appendChild(div);
  animateBalloon(div);
}

function animateBalloon(elem) {
  let position = 0;
  let interval = setInterval(frame, 9);

  function frame() {
    if (
      position >= windowHeight + 200 &&
      document.querySelector('[data-number="' + elem.dataset.number + '"]') !==
        null
    ) {
      clearInterval(interval);
      gameOver = true;
    } else {
      position++;
      elem.style.top = windowHeight - position + "px";
    }
  }
}

function deleteBalloon(elem) {
  elem.remove();
  number++;
  updateScore();
}

function updateScore() {
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = number;
  }
}

function startGame() {
  let loop = setInterval(() => {
    if (!gameOver && number !== total) {
      createBalloon();
    } else if (number !== total) {
      clearInterval(loop);
      popUp.style.display = "flex";
      popUp.querySelector(".lose").style.display = "block";
      popUp.querySelector(".win").style.display = "none";
    } else {
      clearInterval(loop);
      popUp.style.display = "flex";
      popUp.querySelector(".lose").style.display = "none";
      popUp.querySelector(".win").style.display = "block";
    }
  }, 800);
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("balloon")) {
    deleteBalloon(event.target);
  }
});

// startGame();
