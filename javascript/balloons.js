const colors = ["blue", "green", "red", "violet", "yellow"];
const windowWidth = window.innerWidth;
const body = document.body;
const windowHeight = window.innerHeight;
const score = document.querySelectorAll(".score");
const scoreBlock = document.querySelector(".score-block");
let number = 0;
let total = 100;
let balloonCrt = 0;
let gameOver = false;
const popUp = document.querySelector(".pop-up");
const win = popUp.querySelector(".win");
const lose = popUp.querySelector(".lose");
const playBtn = document.querySelectorAll(".play-yes");
const cancelBtn = document.querySelectorAll(".play-no");
const settings = document.querySelector(".settings");
const settingsIcon = document.getElementById("settings-icon");
const volumeControl = document.querySelector(".volume-control");
const volumeSlider = document.getElementById("volume-slider");
let volumeCrt = volumeSlider.value;
let bgAudioOn = document.querySelector(".bg-vol-on");
let bgAudioOff = document.querySelector(".bg-vol-off");

settingsIcon.addEventListener("click", () => {
  if (
    volumeControl.style.display === "none" ||
    (volumeControl.style.display === "" &&
      scoreBlock.style.display === "none") ||
    scoreBlock.style.display === ""
  ) {
    volumeControl.style.display = "flex";
    scoreBlock.style.display = "flex";
  } else {
    volumeControl.style.display = "none";
    scoreBlock.style.display = "none";
  }
});

volumeSlider.addEventListener("input", (event) => {
  volumeCrt = event.target.value;
});

function createBalloon() {
  let div = document.createElement("div");
  let random = Math.floor(Math.random() * colors.length);

  div.className = "balloon balloon-" + colors[random];

  let marginLeft = 50 + "px";
  div.style.left = marginLeft;

  random = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = random + "px";
  div.dataset.number = balloonCrt;
  balloonCrt++;

  body.appendChild(div);
  animateBalloon(div);
}

function animateBalloon(elem) {
  let position = 0;
  let random = Math.floor(Math.random() * 6 - 3);
  let interval = setInterval(frame, 12 - Math.floor(number / 10) + random);

  function frame() {
    if (
      position >= windowHeight + 100 &&
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
  popBalloonSound();
}

function updateScore() {
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = number;
  }
}

function startGame() {
  restartGame();
  let timeout = 0;
  let loop = setInterval(() => {
    timeout = Math.floor(Math.random() * 600 - 100);
    if (!gameOver && number !== total) {
      createBalloon();
    } else if (number !== total) {
      clearInterval(loop);
      settings.style.display = "none";
      popUp.style.display = "flex";
      win.style.display = "none";
      lose.style.display = "block";
    } else {
      clearInterval(loop);
      settings.style.display = "none";
      popUp.style.display = "flex";
      lose.style.display = "none";
      win.style.display = "block";
    }
  }, 800 + timeout);
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("balloon")) {
    deleteBalloon(event.target);
  }
});

function restartGame() {
  let remove = document.querySelectorAll(".balloon");
  for (let i = 0; i < remove.length; i++) {
    remove[i].remove();
  }
  gameOver = false;
  number = 0;
  updateScore();
}

playBtn.forEach((button) => {
  button.addEventListener("click", () => {
    popUp.style.display = "none";
    lose.style.display = "none";
    win.style.display = "none";
    settings.style.display = "flex";
    startGame();
  });
});

cancelBtn.forEach((button) => {
  button.addEventListener("click", () => {
    popUp.style.display = "none";
    settings.style.display = "flex";
  });
});

function popBalloonSound() {
  let audio = document.createElement("audio");
  audio.src = "sounds/pop.mp3";
  audio.volume = volumeCrt;
  audio.play();
}

startGame();
