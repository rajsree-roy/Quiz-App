const startBtn = document.querySelector('.btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const black = document.querySelector('.black');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const optionList = document.querySelector('.option-list');
const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    black.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    black.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    black.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

nextBtn.onclick = () => {

    if (questionCount < questions.length -1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}

//fetching questions & options from array

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i< option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let options = optionList.children;

    if (userAnswer === correctAnswer) {
      answer.classList.add('correct');
      userScore += 1;
      headerScore();
    } 
    else {
      answer.classList.add('incorrect');

    //   if answered incorrect then auto select the correct answer

        for (let i = 0; i < options.length; i++) {
            if (options[i].textContent === correctAnswer) {
              options[i].classList.add('correct');
              break;
            }
          } 
    }

    // Disable all options after an answer has been selected

    for (let i = 0; i < options.length; i++) {
      options[i].classList.add('disabled');
      options[i].removeAttribute('onclick');
    }

    nextBtn.classList.add('active');
  }


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}


function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}


function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `You Scored ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 10;

    let progress = setInterval(() => {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(rgb(32, 29, 208) ${ progressStartValue *  3.6 }deg, rgba(255, 255, 255, 0.102) 0deg)`;

        if ( progressStartValue == progressEndValue){
            clearInterval(progress);

      // Display a GIF based on the user's score

    const gifContainer = document.querySelector('.gif-container');
    let gifSrc = '';
    if (userScore >= 4) {

      // GIF showing the player performed well

      gifSrc = 'img/gif1.gif';
    } else {

      // GIF showing the player needs improvement

      gifSrc = 'img/gif2.gif';
    }

      // Set the GIF source & show it

      gifContainer.innerHTML = `<img src="${gifSrc}" alt="Result GIF">`;
      gifContainer.style.display = 'block';

    }
  }, speed);
}

   // Reset the quiz

  tryAgainBtn.onclick = () => {

    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    quizBox.classList.add('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();

   // Hide the previous GIF
  const gifContainer = document.querySelector('.gif-container');
  gifContainer.innerHTML = '';
  gifContainer.style.display = 'none';

}

  goHomeBtn.onclick = () => {

    // Reload the page to go back to the homepage
    window.location.reload();
}