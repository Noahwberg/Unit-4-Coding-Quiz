var questionsId = document.getElementById("questions");
var timerId = document.getElementById("time");
var answerOptions = document.getElementById("choices");
var clickButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var initialsEndPage = document.getElementById("initials");
var questionStatus = document.getElementById("feedback");

var questionPopUp = 0;
var time = questions.length * 15;
var timerPlaceholder;

function beginQuiz() {
  var openScreen = document.getElementById("start-screen");
  openScreen.setAttribute("class", "hide");
  questionsId.removeAttribute("class");
  timerPlaceholder = setInterval(timerUpdate, 1000);

  timerId.textContent = time;
  pullQuestions();
}

function pullQuestions() {
  var questionShown = questions[questionPopUp];
  var questionTitle = document.getElementById("question-title");
  questionTitle.textContent = questionShown.title;

  answerOptions.innerHTML = "";

  questionShown.choices.forEach(function(choice, i) {
    var choiceButtonElement = document.createElement("button");
    choiceButtonElement.setAttribute("class", "choice");
    choiceButtonElement.setAttribute("value", choice);

    choiceButtonElement.textContent = i + 1 + ". " + choice;
    choiceButtonElement.onclick = questionClick;
    answerOptions.appendChild(choiceButtonElement);
  });
}

function questionClick() {
  if (this.value !== questions[questionPopUp].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerId.textContent = time;
    questionStatus.textContent = "Wrong!";
  } else {
    questionStatus.textContent = "Correct!";
  }

  questionStatus.setAttribute("class", "feedback");
  setTimeout(function() {
    questionStatus.setAttribute("class", "feedback hide");
  }, 1000);

  questionPopUp++;

  if (questionPopUp === questions.length) {
    quizOver();
  } else {
    pullQuestions();
  }
}

function timerUpdate() {
  time--;
  timerId.textContent = time;

  if (time <= 0) {
    quizOver();
  }
}

function quizOver() {
  clearInterval(timerPlaceholder);
  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  var showFinalScore = document.getElementById("final-score");
  showFinalScore.textContent = time;

  questionsId.setAttribute("class", "hide");
}

function enterEventKey(event) {
  if (event.key === "Enter") {
    saveHighscores();
  }
}

function saveHighscores() {
  var initials = initialsEndPage.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

startButton.onclick = beginQuiz;
initialsEndPage.onkeyup = enterEventKey;
clickButton.onclick = saveHighscores;