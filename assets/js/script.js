var startButton = document.getElementById('starter-button');
var timerDisplay = document.getElementById("timer");
//var startDiv = document.getElementsByClassName("start");
var questionDiv = document.getElementById("presented-question");
var answerForm = document.getElementById("answer-list");
var answerA = document.getElementById("answer-a");
var answerB = document.getElementById("answer-b");
var answerC = document.getElementById("answer-c");
var answerD = document.getElementById("answer-d");
const initialTime = 3.0;
var timer = initialTime;
var quizTimeIsUp = false;

// questions array; many thanks to Joanne Chun for writing most of these
var questions = [{
    question:"Can you use double quotes or single quotes to designate a string?",
    answers: ["Double quotes only", "Single quotes only", "Neither can be used", "Either can be used"],
    correctAnswer: "Either can be used",
    author: "Stuart"
},{
    question:"What does API mean?",
    answers: ["After Planned Intervention", "Application Programming Interface", "Alert Potential Interference", "Apple Poster Ink"],
    correctAnswer: "Application Programming Interface",
    author: "Stuart"
},{
    question:"What is Primitive Data?",
    answers: ["Data that has not be validated", "A variable that has not been set", "A band that is popular in Silicon Valley", "Data that only holds one value, such as a string, number, or Boolean"],
    correctAnswer: "Data that only holds one value, such as a string, number, or Boolean",
    author: "Stuart"
},{
    question:"Is jQuery a framework or a programming language?",
    answers: ["A framework only", "A programming language only", "Neither", "Both"],
    correctAnswer: "A framework only",
    author: "Stuart"
},{
    question:"What is event delegation?",
    answers: ["In git, a subbranch that is used for testing only", "In git, assigning an issue to a particular team member", "Using a parent element to handle events that occur on a child element", "A looping subroutine"],
    correctAnswer: "Using a parent element to handle events that occur on a child element",
    author: "Stuart"
},{
    question:"What do all HTML documents start with?",
    answers: ["Hypertext","html","<!DOCTYPE html","<html>"],
    correctAnswer: "<!DOCTYPE html",
    author: "Joanne"
},{
    question:"What is the process of finding errors and fixing them within a program called?",
    answers: ["Solving","Fixing","Resetting","Debugging"],
    correctAnswer: "Debugging",
    author: "Joanne"
},{
    question:"How do you see which remote links (in GitHub) have been established for your project",
    answers: ["git remote links","git remote -v","git add A-","git remote origin"],
    correctAnswer: "git remote -v",
    author: "Joanne"
},{
    question:"Why do we need an alt attribute for images in an HTML document?",
    answers: ["To identify the image","To access the image","To give context for the image"],
    correctAnswer: "To give context for the image",
    author: "Joanne"
},{
    question:"Which CSS property do you use to align the flex container's items on the main-axis?",
    answers: ["justify-content","align-content","align-text","flex-center"],
    correctAnswer: "justify-content",
    author: "Joanne"
},{
    question:"The visible part of the HTML document is between:",
    answers: ["<head> and </head>","<html> and </html>","<body> and </body>","<visible> and </visible"],
    correctAnswer: "<body> and </body>",
    author: "Joanne"
},{
    question:"Which way of adding CSS to HTML documents requires using a link?",
    answers: ["Internal","External","Reference","Inline"],
    correctAnswer: "External",
    author: "Joanne"
},{
    question:"In CSS, how do you select an element with a specific id?",
    answers: ["Write (.) followed by the id of the element","Write (.) after the id of the element","Write (#) followed by the id of the element","Write (id) followed by the id of the element"],
    correctAnswer: "Write (#) followed by the id of the element",
    author: "Joanne"
}];


/*
Variable for score
Variables for stopping different processes
*/

// write shuffle function(array); return shuffled array

var createShuffledArray = function(newArrayLength,sourceArray) {

    // bring random function from password project

    if (newArrayLength >= 1 && newArrayLength <= sourceArray.length) {// what happens if passed-in item is not a number?
        // create var workingArray to collect values
        // for loop pull at random and shorten
            // random number up to current source array length
            // add that value into a new array
            // take that value out of the source array (splice command) // this doesn't need to happen on last loop
        // return workingArray

    } else {
        console.log("passed in array length isn't right")
        return false;
    }
}




var timerCountdown = function(){
    //debugger;
    
    document.getElementById("intro").style.display = "none";
    // make class=start display: none

    // make class=div-question-answerform display: block
    // reduce timer variable by 0.1
    var decreaseTimerVariable = function() {
        timer = timer-0.1;
        if (timer <= 0) {
            quizTimeIsUp = true;
            timerDisplay.innerHTML = "out of time"; // this line doesn't work for some reason // use textContent
            clearInterval(timerDecrement);
        }
        timerDisplay.innerHTML = timer.toFixed(1);
    };
    // call reduction of timer variable each one tenth of a second
    var timerDecrement = setInterval(decreaseTimerVariable,100);
};

var quizProcess = function() {
    // hide the intro
    document.getElementById("intro").style.display = "none";
    // TODO add display the question section
    //Begin clock
    timerCountdown();
    // get questions / answers
    questionDiv.innerHTML = questions[0].question;
    // need to shuffle order of answers
    // should we use .textContent because .innerHTML is "dangerous"?
    answerA.innerHTML = questions[0].answers[0];
    answerB.innerHTML = questions[0].answers[1];
    answerC.innerHTML = questions[0].answers[2];
    answerD.innerHTML = questions[0].correctAnswer;
    
    // listen for answer to question
    answerForm.addEventListener("click", function(evt){
        console.log("answerForm clicked");
        evt.target.style.backgroundColor = "red";
        // need to make sure user can only click once
    });

}


// display intro and Listen for start button: start upon click
// delete console.log("click worked here");

// XXXXXXXXXXXXXXXXXXXXXXXXXXX startButton.addEventListener("click", quizProcess);


/*    
    Select 5 questions
    For each question,
        accept an answer
        display Correct! or Wrong!
        wrong answers reduce clock
        bring up next question .5 seconds
    Score is the amount of time left on the clock
	Check the clock frequently and end game when it expires
		End game is just taking the ability to answer away
	
		
When game ends
	Offer ability to record high score
		Store and retrieve high scores
	Offer "play again?"
*/

//evt.preventDefault();  make sure we are passing in an event; needed for <form>!!!
        


