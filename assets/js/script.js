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

var viewHighScores = document.getElementById("view-high-scores")
var startButton = document.getElementById('starter-button');
var timerDisplay = document.getElementById("timer");
var questionDiv = document.getElementById("presented-question");
var answerForm = document.getElementById("answer-list");
var scoreDisplay = document.getElementById("score-display");
var initialsInput = document.getElementById("initials-input");
var goBackButton = document.getElementById("go-back");
var clearHighScoresButton = document.getElementById("clear-scores");
var answerA = document.getElementById("answer-a");
var answerB = document.getElementById("answer-b");
var answerC = document.getElementById("answer-c");
var answerD = document.getElementById("answer-d");
var correctOrWrong = document.getElementById("correct-or-wrong");

var correctAnswerIs = "";
const numberOfQuestions = 5;
var questionCounter = 0; // must reset with new quiz
const initialTime = 30.0;
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
}
var questionShuffledIndex = [];

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
        // debugger;
        answerForm.removeEventListener("click", processAnswer);
        console.log("answerForm clicked");
        console.log(evt.target.textContent);
        console.log(evt.target.id);
        questionCounter++;
        
        if (questionCounter < numberOfQuestions) {
            console.log("keep going");
            
            if (correctAnswerIs == evt.target.id) {
                console.log("answer is correct");
                // answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Correct!"
                // bring up next question after delay
                if (timer <= delayTime / 1000){
                    stopTimer = true;
                    setTimeout(processScore(),delayTime);
                } else {
                    setTimeout(function(){
                        console.log("this is delayed")
                        displayQuestions(questionCounter);
                    },delayTime);
                };
            } else {
                console.log("answer is wrong");
                // answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Wrong!"
                timer = timer - 10;
                if (timer <= delayTime / 1000){
                    stopTimer = true;
                    setTimeout(processScore(),delayTime);
                } else {
                    // bring up next question
                    setTimeout(function(){
                        console.log("this is delayed")
                        displayQuestions(questionCounter);
                    },delayTime);
                };
                //displayQuestions(questionCounter);
            };
                        
        } else { //stop answering questions; stop timer
            console.log("out of questions");
            if (correctAnswerIs == evt.target.id) {
                console.log("answer is correct");
                // answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Correct!"
                stopTimer = true;
                // bring up next question after short delay
                setTimeout(processScore(),delayTime);
            } else {
                console.log("answer is wrong");
                // answerForm.removeEventListener("click", processAnswer); 
                // display correctOrWrong
                correctOrWrong.textContent = "Wrong!"
                timer = timer - 10;
                stopTimer = true;
                // bring up next question after longer delay
                setTimeout(processScore(),delayTime);
            };
        };
    };    

    var displayQuestions = function(i){
        // display questions / answers
        // TODO hide correct or wrong
        questionDiv.textContent = questions[workingArrayForShuffling[i]].question;
        answerA.textContent = questions[workingArrayForShuffling[i]].answers[0];
        answerB.textContent = questions[workingArrayForShuffling[i]].answers[1];
        answerC.textContent = questions[workingArrayForShuffling[i]].answers[2];
        answerD.textContent = questions[workingArrayForShuffling[i]].answers[3];
        correctAnswerIs = questions[workingArrayForShuffling[i]].correctAnswer;
        // Respond to clicks on answers
        answerForm.addEventListener("click", processAnswer); 
    }

    // TODO hide the intro
    // document.getElementById("start").style.display = "none";

    // Begin clock
    timerCountdown();
    // Display initial questions
    displayQuestions(questionCounter);
};

var processScore = function(){
    // TODO hide quiz panel and turn off event listener
    console.log("time to processScore");
    console.log( timer );
    console.log(questionCounter);
    console.log(questionShuffledIndex);
    timerDisplay.style.backgroundColor = "white";
    if (timer < 0) { timer = 0 };
    scoreDisplay.textContent = "Your final score is " + timer.toFixed(1) + ".";

    // TODO accept initals
    // TODO call displayHighScores
}

var displayHighScores = function(initials){
    // stop default behavior
    event.preventDefault;
    console.log("display high scores");
    console.log(document.getElementById('initials-text').value);
    debugger;
    // TODO make scores visible; hide other stuff
    goBackButton.addEventListener("click", function(){
        console.log("go back button");
        questionCounter = 0; 
        timer = initialTime; 
        stopTimer = false; 
        // make start visible hide everything else
    });
    clearHighScoresButton.addEventListener("click", function(){
        console.log("clear high scores button");
        highScoresArray = blankHighScoresArray;
        updateHighScoresInDOM();
        uploadHighScores();
        window.alert("High scores have been cleared.")    
    });
}

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
}

// High scores functions

var uploadHighScores = function(){
    localStorage.setItem("quizGameScores", JSON.stringify(highScoresArray));
}

var downloadHighScores = function(){
    //debugger;
    var localStorageDownload = localStorage.getItem("quizGameScores");
    if ( localStorageDownload !== null ){
        highScoresArray = JSON.parse(localStorageDownload);
    } else {
        uploadHighScores();
    };
    updateHighScoresInDOM();
}

var updateHighScoresArray = function(initials,score){
    for ( i = 0 ; i < numberOfHighScores ; i++ ){
        if ( score > highScoresArray[i].score ) {
            highScoresArray.splice(0,0,{initials: initials, score: score});
            highScoresArray.pop();
            uploadHighScores();
            updateHighScoresInDOM();
            i = numberOfHighScores;
        };
    };
};

downloadHighScores();
createShuffledIndexArray();
startButton.addEventListener("click", quizProcess);
viewHighScores.addEventListener("click", displayHighScores);

// TODO revise order of functions
// fix question shuffling
