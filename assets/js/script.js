// Global Variables
const blankHighScoresArray = [
    {initials: "---", score: 0},
    {initials: "---", score: 0},
    {initials: "---", score: 0},
    {initials: "---", score: 0},
    {initials: "---", score: 0}
];
var highScoresArray = blankHighScoresArray;
const numberOfHighScores = blankHighScoresArray.length;

var viewHighScores = document.getElementById("view-high-scores");
var timerDisplay = document.getElementById("timer");
var startDiv = document.getElementById("start");
var startButton = document.getElementById('starter-button');
var qAndADiv = document.getElementById("div-question-answer");
var questionDiv = document.getElementById("presented-question");
var answerForm = document.getElementById("answer-list");
var initialsDiv = document.getElementById("initials");
var scoreDisplay = document.getElementById("score-display");
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials-input");
var highScoresDiv = document.getElementById("high-scores");
var goBackButton = document.getElementById("go-back");
var clearHighScoresButton = document.getElementById("clear-scores");
var answerA = document.getElementById("answer-a");
var answerB = document.getElementById("answer-b");
var answerC = document.getElementById("answer-c");
var answerD = document.getElementById("answer-d");
var correctOrWrong = document.getElementById("correct-or-wrong");

var correctAnswerIs = "";
const numberOfQuestions = 4;
var questionCounter = 0; // must reset with new quiz
const initialTime = 20.0;
var timer = initialTime; // must reset with new quiz
var stopTimer = false; // must reset with new quiz
const delayTime = 1000;
const regularDisplay = true; // this variable is for testing purposes

// Questions array; many thanks to Joanne Chun for writing most of these
// IMPORTANT: correctAnswer field is matched with id of question button to determine whether answer is correct; don't change one without changing the other
var questions = [{
    question:"Can you use double quotes or single quotes to designate a string?",
    answers: ["Double quotes only", "Single quotes only", "Neither can be used", "Either can be used"],
    correctAnswer: "answer-d",
    author: "Stuart"
    },{
    question:"What does API stand for?",
    answers: ["After Planned Intervention", "Application Programming Interface", "Alert Potential Interference", "Apple Poster Ink"],
    correctAnswer: "answer-b",
    author: "Stuart"
    },{
    question:"What is Primitive Data?",
    answers: ["Data that has not been validated", "A variable that has not been set", "A rock band that is popular in Silicon Valley", "Data that only holds one value, such as a string, number, or Boolean"],
    correctAnswer: "answer-d",
    author: "Stuart"
    },{
    question:"Is jQuery a framework or a programming language?",
    answers: ["A framework only", "A programming language only", "Neither", "Both"],
    correctAnswer: "answer-a",
    author: "Stuart"
    },{
    question:"What is event delegation?",
    answers: ["In git, a subbranch that is used for testing only", "In git, assigning an issue to a particular team member", "Using a parent element to handle events that occur on a child element", "A looping subroutine"],
    correctAnswer: "answer-c",
    author: "Stuart"
    },{
    question:"What do all HTML documents start with?",
    answers: ["Hypertext","html","<!DOCTYPE html>","<html>"],
    correctAnswer: "answer-c",
    author: "Joanne"
    },{
    question:"What is the process of finding errors and fixing them within a program called?",
    answers: ["Solving","Fixing","Resetting","Debugging"],
    correctAnswer: "answer-d",
    author: "Joanne"
    },{
    question:"How do you see which remote links (in GitHub) have been established for your project",
    answers: ["git remote links","git remote -v","git add A-","git remote origin"],
    correctAnswer: "answer-b",
    author: "Joanne"
    },{
    question:"Why do we need an alt attribute for images in an HTML document?",
    answers: ["To identify the image","To access the image","To suggest an image", "To give a discription of the image"],
    correctAnswer: "answer-d",
    author: "Joanne mod by Stuart"
    },{
    question:"Which CSS property do you use to align the flex container's items on the main-axis?",
    answers: ["justify-content","align-content","align-text","flex-center"],
    correctAnswer: "answer-a",
    author: "Joanne"
    },{
    question:"The visible part of the HTML document is between:",
    answers: ["<head> and </head>","<html> and </html>","<body> and </body>","<visible> and </visible"],
    correctAnswer: "answer-c",
    author: "Joanne"
    },{
    question:"Which way of adding CSS to HTML documents requires using a link?",
    answers: ["Internal","External","Reference","Inline"],
    correctAnswer: "answer-b",
    author: "Joanne"
    },{
    question:"In CSS, how do you select an element with a specific id?",
    answers: ["Write (.) followed by the id of the element","Write (.) after the id of the element","Write (#) followed by the id of the element","Write (id) followed by the id of the element"],
    correctAnswer: "answer-c",
    author: "Joanne"
}];
const totalNumberOfAvailableQuestions = questions.length;
var workingArrayForShuffling = []; // this array is set up in the following for loop // must reset with new quiz
for (i=0; i<totalNumberOfAvailableQuestions; i++) {
    workingArrayForShuffling.push(i);
} // must reset with new quiz
var questionShuffledIndex = []; // must reset with new quiz

// create array that is used to select questions at random
var createShuffledIndexArray = function() {
    var getRandomNumberFromTo = function(min, max) {
        var x = Math.floor(Math.random() * (max - min + 1) + min);
        return x;
    }            
    for (i=0; i < numberOfQuestions; i++) {
        var selectedIndex = getRandomNumberFromTo(0,(workingArrayForShuffling.length-1));
        questionShuffledIndex.push(workingArrayForShuffling[selectedIndex]);
        workingArrayForShuffling.splice(selectedIndex,1);        
    }
};

var quizProcess = function() {
    if (regularDisplay) {
        startDiv.style.display = "none";
        qAndADiv.style.display = "flex";
        correctOrWrong.style.display = "none";
        initialsDiv.style.display = "none";
        highScoresDiv.style.display = "none";
    };
    
    // timerCountdown runs concurrently with calls to displayQuestions and processAnswer
    var timerCountdown = function(){
        // reduce timer variable by 0.1
        var decreaseTimerVariable = function() {
            if ( questionCounter < numberOfQuestions && stopTimer == false ) {
                timer = timer-0.1;
                if (timer > 0) {
                    timerDisplay.textContent = "Time: " + timer.toFixed(1);
                } else {
                    timerDisplay.textContent = "Out of Time!";
                    timerDisplay.style.backgroundColor = "red";
                    // if user runs out of time, stop decrementing the timer
                    clearInterval(timerDecrement); 
                    processScore();
                }
            } else {
                // if the last question has been answered or stopTimer is true, stop decrementing the timer
                clearInterval(timerDecrement);
            };
        };
        // call reduction of timer variable each one tenth of a second
        var timerDecrement = setInterval(decreaseTimerVariable,100);
    };

    var processAnswer = function(evt){
        answerForm.removeEventListener("click", processAnswer);
        questionCounter++;
        
        if (questionCounter < numberOfQuestions) {
            
            if (correctAnswerIs == evt.target.id) {
                answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Correct!";
                correctOrWrong.style.display = "block";
        
                if (timer <= delayTime / 1000){
                    stopTimer = true;
                    timer = 0;
                    setTimeout(processScore(),delayTime);
                } else {
                    // bring up next question after delay
                    setTimeout(function(){
                        displayQuestions(questionCounter);
                    },delayTime);
                };
            } else {
                answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Wrong!"
                correctOrWrong.style.display = "block";
                timer = timer - 10;
                if (timer <= delayTime / 1000){
                    stopTimer = true;
                    timer = 0;
                    setTimeout(processScore(),delayTime);
                } else {
                    // bring up next question
                    setTimeout(function(){
                        displayQuestions(questionCounter);
                    },delayTime);
                };
            };
                        
        } else { //number of questions limit is reached; stop timer
            if (correctAnswerIs == evt.target.id) {
                answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Correct!"
                correctOrWrong.style.display = "block";
                stopTimer = true;
                // bring up processScore after short delay
                setTimeout(processScore(),delayTime);
            } else {
                answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Wrong!"
                correctOrWrong.style.display = "block";
                timer = timer - 10;
                stopTimer = true;
                // bring up next question after longer delay
                setTimeout(processScore(),delayTime);
            };
        };
    };    

    var displayQuestions = function(i){
        // display questions / answers
        console.log(questionCounter);
        correctOrWrong.style.display = "none";
        questionDiv.textContent = questions[questionShuffledIndex[i]].question;
        answerA.textContent = questions[questionShuffledIndex[i]].answers[0];
        answerB.textContent = questions[questionShuffledIndex[i]].answers[1];
        answerC.textContent = questions[questionShuffledIndex[i]].answers[2];
        answerD.textContent = questions[questionShuffledIndex[i]].answers[3];
        correctAnswerIs = questions[questionShuffledIndex[i]].correctAnswer;
        // Respond to clicks on answers
        answerForm.addEventListener("click", processAnswer); 
    }

    // Begin clock
    timerCountdown();
    // Display initial questions
    displayQuestions(questionCounter);
};

var processScore = function(){
    if (timer < 0) { timer = 0 };
    scoreDisplay.textContent = "Your final score is " + timer.toFixed(1) + ".";
    if (regularDisplay) {
        startDiv.style.display = "none";
        qAndADiv.style.display = "none";
        initialsDiv.style.display = "flex";
        highScoresDiv.style.display = "none";
    };
}

var goBackToStart = function(){
    // reset variables for new quiz
    timerDisplay.style.backgroundColor = "white";
    questionCounter = 0; 
    timer = initialTime;
    timerDisplay.textContent = "Time: " + timer.toFixed(1); 
    stopTimer = false;
    workingArrayForShuffling = []; 
    for (i=0; i<totalNumberOfAvailableQuestions; i++) {
        workingArrayForShuffling.push(i);
    };
    questionShuffledIndex = [];
    createShuffledIndexArray(); 
    
    if (regularDisplay) {
        startDiv.style.display = "flex";
        qAndADiv.style.display = "none"; 
        initialsDiv.style.display = "none"; 
        highScoresDiv.style.display = "none"; 
    };
};

function handleForm(event) { event.preventDefault(); displayHighScores(); } 
initialsForm.addEventListener('submit', handleForm);

var displayHighScores = function(evt){ 
    var ini = document.getElementById('initials-text').value;
    ini = ini.substring(0,3);

    updateHighScoresArray(ini,timer.toFixed(1));
    updateHighScoresInDOM();

    if (regularDisplay) {
        startDiv.style.display = "none";
        qAndADiv.style.display = "none";
        initialsDiv.style.display = "none";
        highScoresDiv.style.display = "flex";
    };
};

var updateHighScoresInDOM = function(){
    document.getElementById("hs1i").innerText = highScoresArray[0].initials;
    document.getElementById("hs1s").innerText = highScoresArray[0].score;
    document.getElementById("hs2i").innerText = highScoresArray[1].initials;
    document.getElementById("hs2s").innerText = highScoresArray[1].score;
    document.getElementById("hs3i").innerText = highScoresArray[2].initials;
    document.getElementById("hs3s").innerText = highScoresArray[2].score;
    document.getElementById("hs4i").innerText = highScoresArray[3].initials;
    document.getElementById("hs4s").innerText = highScoresArray[3].score;
    document.getElementById("hs5i").innerText = highScoresArray[4].initials;
    document.getElementById("hs5s").innerText = highScoresArray[4].score;
};

// High scores functions

var uploadHighScores = function(){
    localStorage.setItem("quizGameScores", JSON.stringify(highScoresArray));
};

var downloadHighScores = function(){
    var localStorageDownload = localStorage.getItem("quizGameScores");
    if ( localStorageDownload !== null ){
        highScoresArray = JSON.parse(localStorageDownload);
    } else {
        uploadHighScores();
    };
    updateHighScoresInDOM();
};

var updateHighScoresArray = function(initials,score){
    for ( i = 0 ; i < numberOfHighScores ; i++ ){
        if ( score > highScoresArray[i].score ) {
            highScoresArray.splice(i,0,{initials: initials, score: score});
            highScoresArray.pop();
            uploadHighScores();
            updateHighScoresInDOM();
            i = numberOfHighScores; // this ends the for loop
        };
    };
};

if (regularDisplay) {
    startDiv.style.display = "flex";
    qAndADiv.style.display = "none";
    initialsDiv.style.display = "none";
    highScoresDiv.style.display = "none";
};

timerDisplay.textContent = "Time: " + timer.toFixed(1);
downloadHighScores();
createShuffledIndexArray();
startButton.addEventListener("click", quizProcess);
viewHighScores.addEventListener("click", displayHighScores);
goBackButton.addEventListener("click", goBackToStart);
clearHighScoresButton.addEventListener("click", function(){
    highScoresArray = blankHighScoresArray;
    updateHighScoresInDOM();
    uploadHighScores();
});
