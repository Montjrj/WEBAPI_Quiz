
var timerEl = document.getElementById("#timerDisplay");
var btn = document.getElementById("#start_btn");
var btnContainer = document.getElementById("#btn-container");
var myQuesionsEl = document.getElementById("#Myquestions");
var mainEl;
var currentIndex = 0;

var myQuestions = [
    {
        id:1,
        question: "What does JavaScript primarily add to a web page?",
        choices: ["Styling", "Interactivity", "Page layoutc", "Data storage"],
        answer: " Interactivity"
    },
    {   id:2,
        question: "Which keyword is used to declare a variable in JavaScript ? ",
        choices: ["var", "variable", "v", "declare"],
        answer: "var"
    },
    {   
        id:3,
        question: "What is the purpose of the if statement in JavaScript?",
        choices: ["Looping", "Error handling", "Conditional execution", "Function declaration"],
        answer: "Conditional execution"
    },
    {
        id:4,
        question: " Which data type is used to store a single character in JavaScript? ",
        choices: ["string" , "char", "character" , "letter" ],
        answer: "string"
    },
    {
        id:5,
        question: "How do you write a comment in JavaScript to explain your code?",
        choices: ["/* This is a comment */","// This is a comment //" , " This is a comment " , "<!-- This is a comment -->"  ],
        answer: "/* This is a comment */"
    }
]

function countdown() {

    var timeLeft = 60; 

  var timeInterval = setInterval(function () {

    if (timeLeft > 1) {
    
      timerEl.textContent = "Time: " + timeLeft + ' seconds remaining';

      timeLeft--;
    } else if (timeLeft === 1) {
    
      timerEl.textContent = "Time: " + timeLeft + ' second remaining';
      timeLeft--;
    } else {

      timerEl.textContent = '';
     
      clearInterval(timeInterval);
     
    }
  }, 1000);    
}



function displaymyQuestions () {
    var len = myQuestions[currentIndex].choices.length
    var quest = myQuestions[currentIndex].choices
    
    
    myQuesionsEl.textContent = myQuestions[currentIndex].question
    for (let i = 0; i < len; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.innerHTML = quest[i];
        choiceBtn.onclick = clickMe;
        btnContainer.appendChild(choiceBtn)
    }
}

displaymyQuestions();

function clickMe (event) {
    var element = event.target;
    currentIndex++;
    displaymyQuestions()
    console.log(element.innerHTML)
}

const start_btn = document.getElementById('start_btn')

start_btn.addEventListener("click", countdown)
start_btn.addEventListener("click", displaymyQuestions)

