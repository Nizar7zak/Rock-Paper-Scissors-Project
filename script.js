const arrResult = ["Draw! You seem to be a smart competitor",
"Congratulations, you beat me", "Hahaha i defeated you!"];
const arrOption = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll(".btn");
const labels = document.querySelectorAll(".name--choice");

const title = document.querySelector(".game--name");

const sectionPlayer = document.querySelector(".section--player");
const sectionComputer = document.querySelector(".section--computer");
const resultUpdate = document.querySelector(".result--show");
const btnPlayAgain = document.querySelector(".btn--again");

const gameImgPlayer = document.querySelector(".image--play");
const gameImgComputer = document.querySelector(".question");

const rock = "img/rock.png";
const paper = "img/paper.png";
const scissors = "img/scissors.png";
const guess = "img/guess.png"
const question = "img/question.png"

const btnRulesChange = document.querySelector("#get--value");

const text1 = document.querySelector(".text--replace1");
const text2 = document.querySelector(".text--replace2");
const text3 = document.querySelector(".text--replace3");

let choice1;
let choice2;
let choice3;

const labelOfRock = document.querySelector(".choice--rock");
const labelOfPaper = document.querySelector(".choice--paper");
const labelOfScissors = document.querySelector(".choice--scissors");

const img1 = document.querySelector(".img--replace1");
const img2 = document.querySelector(".img--replace2");
const img3 = document.querySelector(".img--replace3");

const imgRock = document.querySelector(".rock");
const imgPaper = document.querySelector(".paper");
const imgScissors = document.querySelector(".scissors");

/*----------------FOR CHANGE RULES-------------------------*/

btnRulesChange.addEventListener("click", () => {
    btnRulesChange.style.display = "none";
    btnDefault.style.display = "block";

    choice1 = text1.value;
    choice2 = text2.value;
    choice3 = text3.value;

    arrOption[0] = choice1 || arrOption[0];
    arrOption[1] = choice2 || arrOption[1];
    arrOption[2] = choice3 || arrOption[2];

    labelOfRock.textContent = arrOption[0]
    labelOfPaper.textContent = arrOption[1];
    labelOfScissors.textContent = arrOption[2];

    title.textContent = arrOption[0] + " " + arrOption[1] + " " + arrOption[2];

    imgRock.src = (img1.files && img1.files[0]) ? URL.createObjectURL(img1.files[0]) : rock;
    imgPaper.src = (img2.files && img2.files[0]) ? URL.createObjectURL(img2.files[0]) : paper;
    imgScissors.src = (img3.files && img3.files[0]) ? URL.createObjectURL(img3.files[0]) : scissors;
    getAgain();

})

/* ----------- BUTTON FOR RESET TO DEFAULT -----------*/

const btnDefault = document.querySelector("#rest")

btnDefault.addEventListener("click", () => {

    btnRulesChange.style.display = "block";
    btnDefault.style.display = "none";

    text1.value = arrOption[0] = "rock";
    text2.value = arrOption[1] = "paper";
    text3.value = arrOption[2] = "scissors";

    labelOfRock.textContent = arrOption[0]
    labelOfPaper.textContent = arrOption[1];
    labelOfScissors.textContent = arrOption[2];

    title.textContent = arrOption[0] + " " + arrOption[1] + " " + arrOption[2];

    imgRock.src = rock;
    imgPaper.src = paper;
    imgScissors.src = scissors;

    img1.value = null;
    img2.value = null;
    img3.value = null;
    getAgain();

})

/* --------------------BTN CHOICES----------------- */

buttons.forEach((btn) => { 

    btn.addEventListener("click", getChoice)
})

labels.forEach((label) => {

    label.addEventListener("click", getChoice)
})

function getChoice () {

    let playerChoice = this.id;

    if (playerChoice === "first") {
        playerChoice = arrOption[0];
        gameImgPlayer.src = imgRock.src;

    } else if (playerChoice === "second") {
        playerChoice = arrOption[1];
        gameImgPlayer.src = imgPaper.src;

    } else if (playerChoice === "third") {
        playerChoice = arrOption[2]
        gameImgPlayer.src = imgScissors.src;
    } else {
        gameImgPlayer.src = guess;
    }

    let computerChoice = randomComputer();
    checkTheWinner(playerChoice, computerChoice);
    afterChoose();
};

const afterChoose = () => {

    btnPlayAgain.style.display = "block";

    buttons.forEach((btn) => { 

        btn.disabled = true;
        btn.classList.remove("active");
        btn.classList.add("disable");

    });

    labels.forEach((label) => {

        label.disabled = true;
        label.classList.remove("active");
        label.classList.add("disable");

    })
}

/* --------------------BTN PLAY AGAIN----------------- */

btnPlayAgain.addEventListener("click", getAgain)

function getAgain () {

    btnPlayAgain.style.display = "none";

    labels.forEach((label) => {

        label.disabled = false;
        label.classList.remove("disable")
        label.classList.add("active")
    })

    
    buttons.forEach((btn) => { 
        btn.disabled = false;
        btn.classList.remove("disable");
        btn.classList.add("active");

    });

    resultUpdate.textContent = "Choose one!";
    gameImgPlayer.src = guess;
    gameImgComputer.src = question;

    sectionPlayer.classList.remove("loser");
    sectionPlayer.classList.remove("winner");
    sectionComputer.classList.remove("winner");
    sectionComputer.classList.remove("loser");

}

/*----------------COMPUTER CHOICE-------------*/

let randomComputer = () => {

    let random = Math.floor(Math.random() * 3);
    let computerChoice = arrOption[random];
 
    if (computerChoice === arrOption[0]) {
        gameImgComputer.src = imgRock.src;
    } else if (computerChoice === arrOption[1]) {
        gameImgComputer.src = imgPaper.src;
    } else if (computerChoice === arrOption[2]) {
        gameImgComputer.src = imgScissors.src;
    } else {
        gameImgComputer.src = question;
    }
    return computerChoice;

};

/*-----------------Game Rule--------------------*/
function checkTheWinner(playerChoice,computerChoice) {

    if (playerChoice === computerChoice) {
        resultUpdate.textContent = arrResult[0];

    } else if (playerChoice === arrOption[0]) {

        if (computerChoice === arrOption[2]){ 

            getWinner();

        } else {

            getLoser();
        }

    } else if (playerChoice === arrOption[2]) {

        if (computerChoice === arrOption[0]) {

            getLoser();

        } else {

            getWinner();

        }

    } else if (playerChoice === arrOption[1]) {

        if (computerChoice === arrOption[0]) {

            getWinner();

        } else {

            getLoser();

        }
    }
}



function getWinner () {
    resultUpdate.textContent = arrResult[1];
    sectionPlayer.classList.add("winner");
    sectionComputer.classList.add("loser");
}
function getLoser () {
    resultUpdate.textContent = arrResult[2];
    sectionPlayer.classList.add("loser");
    sectionComputer.classList.add("winner");
}