document.addEventListener("DOMContentLoaded", function() {
  // Аналог $(document).ready(function(){
  const wordEl = document.getElementById("word");
  const wrongLettersEl = document.getElementById("wrong-letters");
  const playAgainBtn = document.getElementById("play-again");
  const bodyParts = document.querySelectorAll(".figure-part");
  const popupEl = document.getElementById("popup-container");
  const notificationEl = document.getElementById("notification-container");
  const finalMessage = document.getElementById("final-message");

  const words = [
    "дедушка",
    "бабушка",
    "папа",
    "мама",
    "брат",
    "сестра",
    "дядя",
    "тетя"
  ];

  // Берем рандомное слово с массива слов words
  let selectedWord = words[Math.floor(Math.random() * words.length)];

  const correctLetters = [];
  const wrongLetters = [];

  // Функция показа слова и при совпадении текста в тэге id=word с рандомным словом, выводит уведомление с поздравлением и возможностью заново поиграть

  function showWord() {
    wordEl.innerHTML = selectedWord
      .split("")
      .map(
        letter =>
          `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
        </span>`
      )
      .join("");

    const innerWord = wordEl.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
      finalMessage.innerText = "Поздравляем! Вы выиграли)";
      popupEl.style.display = "flex";
    }
  }

  // Функция показа уведомления Повторения буквы
  function showNotification() {
    notificationEl.classList.add("show");

    setTimeout(function() {
      notificationEl.classList.remove("show");
    }, 2000);
  }

  // Функция, которая запускается при вводе неправильной буквы
  function actionWrongLetter(wrongLetter) {
    if (!wrongLetters.includes(wrongLetter)) {
      if (wrongLetters.length < bodyParts.length) {
        wrongLetters.push(wrongLetter);
        wrongLettersEl.innerHTML = `
            <p>Неправильно:</p>
            <span>${wrongLetters.join(",")}</span>
        `;
        bodyParts[wrongLetters.length - 1].style.display = "block";
      } else {
        popupEl.style.display = "flex";
        finalMessage.innerText = "К сожалению, Вы проиграли(((";
      }
    } else {
      showNotification();
    }
  }

  // Событие при нажатии на клавиши [а-я]
  window.addEventListener("keypress", function(e) {
    if (e.keyCode >= 1072 && e.keyCode <= 1103) {
      const letter = e.key;
      if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
        showWord();
      } else {
        actionWrongLetter(e.key);
      }
    }
  });

  // Событие клика на кнопке Перезапустить игру
  playAgainBtn.addEventListener("click", function() {
    popupEl.style.display = "none";
    correctLetters.splice(0);
    wrongLetters.splice(0);
    wrongLettersEl.innerHTML = "";
    bodyParts.forEach(el => (el.style.display = "none"));
    selectedWord = words[Math.floor(Math.random() * words.length)];
    showWord();
  });

  showWord();
});
