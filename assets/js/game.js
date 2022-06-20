const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('question-counter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let sec = 99;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

const maxQuestions = 3;

function timer () {
    let timer = setInterval(function () {
        document.getElementById('score').innerHTML = sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            alert("Quiz over, you ran out of time!");
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign("end.html");
        }
    }, 1000);
}

startGame = () => {
    alert("Welcome to Code Quiz. \n\nEvery correct answer will add 10 sec to your time. Every incorrect answer will dock you 10 sec. \n\nYour total score is your remaining time out of 100 sec. Good Luck!")
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    timer();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', sec);
        return window.location.assign("end.html")
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choices.forEach( choice => {
    choice.addEventListener('click', e =>{
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        };

        if(classToApply === 'correct') {
            // incrementScore(timeAdd);
            sec = sec + 10;
            scoreText.innerHTML = sec;
            timer();
        }

        if(classToApply === 'incorrect') {
            // incrementScore(timeSubtract);
            sec = sec - 10;
            scoreText.innerHTML = sec;
            timer();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
