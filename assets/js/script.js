var timerEl = document.getElementById("timerDisplay");
        var btnContainer = document.getElementById("btn-container");
        var quizContainer = document.getElementById("quiz-container");
        var questionContainer = document.getElementById("question-container");
        var questionEl = document.getElementById("myquestions");
        var choicesEl = document.getElementById("choices-container");
        var resultEl = document.getElementById("result");
        var endQuizContainer = document.getElementById("end-quiz-container");
        var highscoreContainer = document.getElementById("highscore-container");
        var finalScoreEl = document.getElementById("final-score");
        var initialsInput = document.getElementById("initials");
        var submitScoreBtn = document.getElementById("submit-score");
        var highscoreList = document.getElementById("highscore-list");
        var goBackBtn = document.getElementById("go-back");
        var clearHighscoresBtn = document.getElementById("clear-highscores");
        var viewHighScores = document.getElementById("viewHighScores");
        var startquizbutton = document.getElementById("start_btn")


        var currentIndex = 0;
        var timeLeft = 60; // Initialize timeLeft to 60 seconds
        var score = 0;
        var highScores = [];
        var timeInterval;

        startquizbutton.addEventListener("click",startquiz)
        
        function startquiz() {

            startGame(); 
            countdown (); 

        };


        var myQuestions = [
            {
                id: 1,
                question: "What does JavaScript primarily add to a web page?",
                choices: ["Styling", "Interactivity", "Page layout", "Data storage"],
                answer: "Interactivity"
            },
            {
                id: 2,
                question: "Which keyword is used to declare a variable in JavaScript ? ",
                choices: ["var", "variable", "v", "declare"],
                answer: "var"
            },
            {
                id: 3,
                question: "What is the purpose of the if statement in JavaScript?",
                choices: ["Looping", "Error handling", "Conditional execution", "Function declaration"],
                answer: "Conditional execution"
            },
            {
                id: 4,
                question: "Which data type is used to store a single character in JavaScript? ",
                choices: ["string", "char", "character", "letter"],
                answer: "string"
            },
            {
                id: 5,
                question: "How do you write a comment in JavaScript to explain your code?",
                choices: ["/* This is a comment */", "// This is a comment //", " This is a comment ", "<!-- This is a comment -->"],
                answer: "/* This is a comment */"
            }
        ];


        function startGame() {
            currentIndex = 0;
            score = 0;
            timeLeft = 60;
            viewHighScores.style.display="none";
            quizContainer.style.display="none";
            questionContainer.style.display="block";
            endQuizContainer.style.display="none";
            highscoreContainer.style.display="none";
            countdown();
            displayQuestion();
        }


        function countdown() {
                timeInterval = setInterval(function () {
                if (timeLeft > 1) {
                    timeLeft--;
                    timerEl.textContent = "Time: " + timeLeft + ' seconds remaining';
                } else if (timeLeft === 1) {
                    timeLeft--;
                    timerEl.textContent = "Time: " + timeLeft + ' second remaining';
                } else {
                    timerEl.textContent = 'Time is up!';
                    clearInterval(timeInterval);
                    endQuiz();
                }
            }, 1000);
        }


        function displayQuestion() {
            if (currentIndex < myQuestions.length) {
                var questionData = myQuestions[currentIndex];
                questionEl.textContent = questionData.question;
                choicesEl.innerHTML = '';


                for (let i = 0; i < questionData.choices.length; i++) {
                    var choiceBtn = document.createElement("button");
                    choiceBtn.textContent = questionData.choices[i];
                    choiceBtn.classList.add("button")
                    choiceBtn.addEventListener("click", function () {
                        checkAnswer(questionData.choices[i], questionData.answer);
                    });
                    choicesEl.appendChild(choiceBtn);
                    choicesEl.appendChild(document.createElement("br"));
                }
            } else {
                endQuiz();
            }
        }


        function checkAnswer(selectedChoice, correctAnswer) {
            if (selectedChoice === correctAnswer) {
                resultEl.textContent = "Correct!";
                score++;
            } else {
                resultEl.textContent = "Wrong!";
                timeLeft -= 10;
            }
            currentIndex++;
            setTimeout(function () {
                resultEl.textContent = '';
                displayQuestion();
            }, 1000);
        }


        //viewHighScores.addEventListener("click", endQuiz())


        function endQuiz() {
            clearInterval(timeInterval);
            timerEl.textContent = 'Quiz Ended!';
            quizContainer.style.display="none";
            endQuizContainer.style.display="none";
            questionContainer.style.display="none";
            finalScoreEl.textContent = score;
            endQuizContainer.style.display="block";
             
        }


        function saveHighScore() {
            var initials = initialsInput.value.trim();
            highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            if (initials !== "") {
                var highscore = { initials: initials, score: score };
                highScores.push(highscore);
                highScores.sort(function (a, b) {
                    return b.score - a.score;
                });
                localStorage.setItem("highScores", JSON.stringify(highScores));
                endQuizContainer.style.display="none";
                highscoreContainer.style.display="block";
                showHighScores();
            }
        }


        function showHighScores() {
            highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highscoreList.innerHTML = "";
            for (var i = 0; i < highScores.length; i++) {
                var li = document.createElement("li");
                li.textContent = highScores[i].initials + " - " + highScores[i].score;
                highscoreList.appendChild(li);
            }
        }


        function clearHighScores() {
            localStorage.removeItem("highScores");
            highscoreList.innerHTML = "";
        }


        function goBack() {
            quizContainer.classList.remove("hidden");
            questionContainer.classList.remove("hidden");
            endQuizContainer.classList.add("hidden");
            highscoreContainer.classList.add("hidden");
            initialsInput.value = "";
        }


        viewHighScores.addEventListener("click", function () {
            quizContainer.classList.add("hidden");
            questionContainer.classList.add("hidden");
            endQuizContainer.classList.add("hidden");
            highscoreContainer.classList.remove("hidden");
            showHighScores();
        });
        submitScoreBtn.addEventListener("click", saveHighScore);
        goBackBtn.addEventListener("click", goBack);
        clearHighscoresBtn.addEventListener("click", clearHighScores);


        // var start_btn = document.getElementById('start_btn');
        // start_btn.addEventListener('click', startGame);


