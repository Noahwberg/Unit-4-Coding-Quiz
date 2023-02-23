function pullScores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var randomLiVar = document.createElement("li");
    randomLiVar.textContent = score.initials + " - " + score.score;

    var randomOlVar = document.getElementById("highscores");
    randomOlVar.appendChild(randomLiVar);
  });
}

function removeScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = removeScores;

pullScores();
