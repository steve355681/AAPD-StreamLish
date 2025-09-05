import '../assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';


const questions = [
  {
    word: "miraculous",
    kk: "[mɪˋrækjələs]",
    dj: "[miˋrækjuləs]",
    options: [
      { option: "a.神奇的,奇蹟般的", correct: true },
      { option: "a. 補償的", correct: false },
      { option: "n. 商品、貨物", correct: false },
      { option: "v. 爭論、爭端", correct: false }
    ]
  },
  {
    word: "loan",
    kk: "[ləʊn]",
    dj: "[ləʊn]",
    options: [
      { option: "v. 貸款、借款", correct: false },
      { option: "n. 一條麵包", correct: false },
      { option: "n. 土壤", correct: true },
      { option: "v. 爭論、爭端", correct: false }
    ]
  }
];

let step = 0;
let questionLock = false;
const questionResult = {
  correctCount: 0,
  wrongCount: 0
};

window.addEventListener("load", loadQuestion);

function loadQuestion() {
  step++;

  const question = questions[step - 1];

  const stepWord = document.getElementById("test-step");
  stepWord.textContent = `${step}/${questions.length}`;

  const stepProgress = document.getElementById("test-step-progress");
  const stepProgressChild = stepProgress.children[step - 1];
  stepProgressChild.classList.remove("border-white-50");
  stepProgressChild.classList.add("border-primary-500");

  const questionTitle = document.getElementById("question-title");
  questionTitle.textContent = question.word;

  const kkAlphabet = document.getElementById("kk-alphabet");
  kkAlphabet.textContent = question.kk;

  const djAlphabet = document.getElementById("dj-alphabet");
  djAlphabet.textContent = question.dj;

  const testQuestions = document.getElementById("test-questions");
  testQuestions.innerHTML = "";
  question.options.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("btn", "btn-primary-500", "w-100", "rounded-pill", "text-white", "mb-6", "py-5");
    btn.textContent = option.option;
    btn.dataset.index = idx;

    const handler = () => {
      if (questionLock) return;
      questionLock = true;
      handleAnswer(btn, question);
    };

    btn.addEventListener("click", handler);
    testQuestions.appendChild(btn);
  });
}

const nextBtn = document.getElementById("next-button");
nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("opacity-0");
  if(step === questions.length) {
    const testQuestionWrapper = document.getElementById("test-question-wrapper");
    testQuestionWrapper.classList.add("d-none");
    const testFinish = document.getElementById("test-finish");
    testFinish.classList.remove("d-none");

    const wrongCount = document.getElementById("wrong-count");
    const correctCount = document.getElementById("correct-count");
    const awardCount = document.getElementById("award-count");
    wrongCount.textContent = questionResult.wrongCount;
    correctCount.textContent = questionResult.correctCount;
    awardCount.textContent = questionResult.correctCount;
  } else {
    questionLock = false;
    loadQuestion();
  }
});

function handleAnswer(selectBtn, question) {
  const testQuestions = document.getElementById("test-questions").children;

  let isCorrect = false;
  for(let i = 0; i < testQuestions.length; i++) {
    const btn = testQuestions[i];

    const idx = btn.dataset.index;
    const option = question.options[idx];
  
    // 點擊後顯示中文翻譯
    if (btn === selectBtn) {
      if (option.correct) {
        // 選對
        isCorrect = true;
        questionResult.correctCount++;
        btn.classList.remove("btn-primary-500");
        btn.classList.add("btn-success-300");
        btn.innerHTML += `<img src="../assets/images/check.png" alt="check" class="yes align-bottom ms-2">`;
      } else {
        // 選錯
        questionResult.wrongCount++;
        btn.classList.remove("btn-primary-500");
        btn.classList.add("btn-danger-300");
        btn.innerHTML += `<img src="../assets/images/wrong.png" alt="wrong" class="no align-bottom ms-2">`;
      }
    } else if (option.correct) {
      // 顯示正確答案
      btn.classList.remove("btn-primary-500");
      btn.classList.add("btn-success-300");
      btn.innerHTML += `<img src="../assets/images/check.png" alt="check" class="yes align-bottom ms-2">`;
    }
  }

  const nextBtn = document.getElementById("next-button");
  nextBtn.classList.remove("opacity-0");
  const nextBtnText = document.getElementById("next-button-text");
  if(step === questions.length) {
    nextBtnText.textContent = "結束了，完成測驗";
  } else {
    nextBtnText.textContent = isCorrect ? "我真棒，挑戰下一題" : "真可惜，挑戰下一題";
  }
}