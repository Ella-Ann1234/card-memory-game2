const main = document.querySelector("main");

const welcomePage = document.querySelector(".welcomePage");
const startingPage = document.querySelector(".startingPage");
const instructions = document.querySelector(".instructions");
const chooseDifficulty = document.querySelector(".chooseDifficulty");
const restartContainer = document.querySelector(".restartContainer");
const restartTittle = document.querySelector(".restartTittle");

const cardStacks = document.querySelectorAll(".cardStack");
const frontCards = document.querySelectorAll("[data-frontCard]");
const backCards = document.querySelectorAll(".backCard");

const startBtn = document.querySelector(".startBtn");
const easyBtn = document.querySelector(".easyBtn");
const meduimBtn = document.querySelector(".meduimBtn");
const hardBtn = document.querySelector(".hardBtn");
const enterBtn = document.querySelector(".enterBtn");
const replayBtns = document.querySelectorAll(".replayBtn");

const nameInputContainer = document.querySelector(".nameInputContainer");
const playersName = document.querySelector(".playersName");
const enteredName = document.querySelector(".enteredName");
const trailsNo = document.querySelector(".trailsNo");
const scoreNo = document.querySelector(".scoreNo");


//flip to start Game
function flipStartingPage(e) {
  startingPage.classList.toggle("flipME");
  instructions.classList.toggle("flipped");
}

startingPage.addEventListener("click", flipStartingPage);
instructions.addEventListener("click", flipStartingPage);


//start button to choose difficulty
startBtn.addEventListener("click", () => {
  chooseDifficulty.style.display = "block";
  welcomePage.style.display = "none";
});

easyBtn.addEventListener("click", () => {
  nameInputContainer.style.display = "block";
  chooseDifficulty.style.display = "none";
  playersName.focus();
  trailsNo.textContent = 20;
});

meduimBtn.addEventListener("click", () => {
  nameInputContainer.style.display = "block";
  chooseDifficulty.style.display = "none";
  playersName.focus();
  trailsNo.textContent = 16;
});

hardBtn.addEventListener("click", () => {
  nameInputContainer.style.display = "block";
  chooseDifficulty.style.display = "none";
  playersName.focus();
  trailsNo.textContent = 12;
});


// to make card random
function appearRandom() {
  let cardClass = [
    "cross",
    "block",
    "circle",
    "x",
    "cross",
    "block",
    "circle",
    "x",
    "cross",
    "block",
    "circle",
    "x",
    "cross",
    "block",
    "circle",
    "x",
  ];
  sortedCard = cardClass.sort(() => (Math.random() > 0.5 ? 1 : -1));
  frontCards.forEach((frontCard, index) => {
    frontCard.className = sortedCard[index];
  });
}


//to clear whiteSpace
playersName.addEventListener("keyup", () => {
  inputName = playersName.value.trim();
  if (inputName.length >= 2) {
    enterBtn.removeAttribute("disabled");
  } else {
    enterBtn.setAttribute("disabled", true);
  }
});


//to open game arena
enterBtn.addEventListener("click", () => {
  appearRandom();
  main.style.display = "grid";
  nameInputContainer.style.display = "none";
  enteredName.textContent = playersName.value;
  appearRandom();
});


//game concept
cardStacks.forEach((cardStack) => {
  cardStack.addEventListener("click", (e) => {
    e.target.classList.add("backFlip");
    console.log(e.target);
    e.target.previousElementSibling.classList.add("frontFlip");

    e.target.previousElementSibling.classList.add("clicked");

    let clickedCards = document.querySelectorAll(".clicked");


    if (clickedCards.length === 2) {
      trailsNo.textContent = trailsNo.textContent - 1;
      scoreNo.textContent = scoreNo.textContent - 2;
      if (clickedCards[0].className === clickedCards[1].className) {
        clickedCards.forEach((clickedCard) => {
          clickedCard.parentElement.classList.add("disapper");
          clickedCard.classList.remove("clicked");

        });
      } else {
        clickedCards.forEach((clickedCard) => {
          clickedCard.classList.remove("clicked");
          setTimeout(() => {
            clickedCard.nextElementSibling.classList.remove("backFlip");
            clickedCard.classList.remove("frontFlip");
          }, 800);
        });
      }
    }

   
    if (trailsNo.textContent == 0) {
      setTimeout(() => {
        restartContainer.style.display = "block";
      }, 900);
    }

    
    let disapperdCard = document.querySelectorAll(".disapper");
   
    if (disapperdCard.length === 16) {
      setTimeout(() => {
        restartContainer.style.display = "block";
        restartTittle.innerHTML = 
         ' <p class="restartTittle"> YOU <BR> WIN!!!</BR> </p>'
        
      }, 900);
    }
  });
  

});

//refresh the game to play again
replayBtns.forEach((replayBtn) => {
  replayBtn.addEventListener("click", () => {
    appearRandom();
    let removedCards = document.querySelectorAll(".disapper");
    removedCards.forEach((removedCard) => {
      removedCard.classList.remove("disapper");
    });

    backCards.forEach((backCard) =>{
      backCard.classList.remove("backFlip");
    })
    main.style.display = "none";
    scoreNo.textContent = 50;
    restartContainer.style.display = "none";
    chooseDifficulty.style.display = "block";
  });
});
