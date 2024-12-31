const question = [
  {
    question: "Türkiye'nin başkenti neresidir?",
    answers: [
      { text: "İstanbul", correct: false },
      { text: "Ankara", correct: true },
      { text: "Rize", correct: false },
      { text: "İstanbul", correct: false },
    ],
  },
  {
    question: "Eiffel Kulesi hangi şehirde bulunmaktadır?",
    answers: [
      { text: "Londra", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Roma", correct: false },
    ],
  },
  {
    question: "Dünya üzerindeki en uzun nehir hangisidir?",
    answers: [
      { text: "Amazon", correct: false },
      { text: "Mississippi", correct: false },
      { text: "Yangtze", correct: false },
      { text: "Nil", correct: true },
    ],
  },
  {
    question: "Mona Lisa tablosunun sanatçısı kimdir?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Vincent van Gogh", correct: false },
      { text: "Michelangelo", correct: false },
      { text: "Pablo Picasso", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct; // Doğru/yanlış bilgisini ata
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Tüm butonları kontrol et ve doğru olanı işaretle
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Cevap seçildikten sonra butonları devre dışı bırak
  });

  nextButton.style.display = "block"; // "Next" butonunu göster
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

window.onload = startQuiz; // Sayfa yüklendiğinde quiz başlasın
