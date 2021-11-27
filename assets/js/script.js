var startButton = document.getElementById('starter-button');
var timerDisplay = document.getElementById("timer");
//var startDiv = document.getElementsByClassName("start");
var questionDiv = document.getElementById("presented-question");
var answerForm = document.getElementById("answer-list");
var goBackButton = document.getElementById("go-back");
var clearHighScoresButton = document.getElementById("clear-scores");
var answerA = document.getElementById("answer-a");
var answerB = document.getElementById("answer-b");
var answerC = document.getElementById("answer-c");
var answerD = document.getElementById("answer-d");
const numberOfQuestions = 5;
var answersReceived = 0;
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
    answers: ["Data that has not been validated", "A variable that has not been set", "A rock band that is popular in Silicon Valley", "Data that only holds one value, such as a string, number, or Boolean"],
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
    answers: ["To identify the image","To access the image","To suggest an image", "To give a discription of the image"],
    correctAnswer: "To give a discription of the image",
    author: "Joanne mod by Stuart"
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

const totalNumberOfAvailableQuestions = questions.length;
var workingArrayForShuffling = [];
var questionShuffledIndex = [];

for (i=0; i<totalNumberOfAvailableQuestions; i++) {
    workingArrayForShuffling.push(i);
}

// write shuffle function(array); return shuffled array

var createShuffledIndexArray = function() {

     // generates random number between two numbers, inclusive
    var getRandomNumberFromTo = function(min, max) {
        var x = Math.floor(Math.random() * (max - min + 1) + min);
        return x;
    }            
  
    for (i=0; i < numberOfQuestions; i++) {
        var selectedIndex = getRandomNumberFromTo(0,(numberOfQuestions - 1));
        questionShuffledIndex.push(workingArrayForShuffling[selectedIndex]);
        workingArrayForShuffling.splice(selectedIndex,1);
    }

};




var timerCountdown = function(){
    //debugger;
    
    // reduce timer variable by 0.1
    var decreaseTimerVariable = function() {
        timer = timer-0.1;
        if (timer <= 0) {
            quizTimeIsUp = true;
            timerDisplay.textContent = "out of time"; // this line doesn't work for some reason // use textContent
            clearInterval(timerDecrement);
        }
        timerDisplay.textContent = "Time: " + timer.toFixed(1);
    };
    // call reduction of timer variable each one tenth of a second
    var timerDecrement = setInterval(decreaseTimerVariable,100);
};

var displayQuestions = function(i){
    // display questions / answers
    questionDiv.textContent = questions[workingArrayForShuffling[i]].question;
    // should we use .textContent because .textContent is "dangerous"?
    answerA.textContent = questions[workingArrayForShuffling[i]].answers[0];
    answerB.textContent = questions[workingArrayForShuffling[i]].answers[1];
    answerC.textContent = questions[workingArrayForShuffling[i]].answers[2];
    answerD.textContent = questions[workingArrayForShuffling[i]].answers[3];
}

var processAnswer = function(evt){
    console.log("answerForm clicked");
    answersReceived++;
        // if answer is correct else 
        //evt.target.style.backgroundColor = "red";
        // need to make sure user can only click once; turn off listener
    if (answersReceived = numberOfQuestions - 1) {
        //stop answering questions; stop timer
    }
}

var quizProcess = function() {
    // hide the intro
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX document.getElementById("start").style.display = "none";
    // TODO add display the question section
    //Begin clock
    timerCountdown();
    
    displayQuestions(0);
        // listen for answer to question
            
};


// display intro and Listen for start button: start upon click
// delete console.log("click worked here");

createShuffledIndexArray();
startButton.addEventListener("click", quizProcess);
answerForm.addEventListener("click", processAnswer);


goBackButton.addEventListener("click", function(){console.log("go back button")});
clearHighScoresButton.addEventListener("click", function(){console.log("clear high scores button")});


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
        
// // returns a random element from an array
// var getRandomElementFromArray = function(array) {
//     var lastElementIndex = array.length - 1;
//     var randomIndex = getRandomNumberFromTo(0, lastElementIndex);
//     return array[randomIndex];
// }

// // splices a given value into a random location in a given array; this is used to ensure that required characters are always included in the output
// var spliceValueAtRandomIndex = function(value, array) {
//     var lastElementIndex = array.length - 1;
//     var randomIndex = getRandomNumberFromTo(0, lastElementIndex);
//     array = array.splice(randomIndex, 0, value);
// }

