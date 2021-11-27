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
var correctAnswerIs = "";
var correctOrWrong = document.getElementById("correct-or-wrong");
const numberOfQuestions = 5;
var questionCounter = 0;
const initialTime = 3.0;
var timer = initialTime;
var quizTimeIsUp = false;

// questions array; many thanks to Joanne Chun for writing most of these
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
var workingArrayForShuffling = [];
var questionShuffledIndex = [];

for (i=0; i<totalNumberOfAvailableQuestions; i++) {
    workingArrayForShuffling.push(i);
}

// create array that is used to select questions at random
var createShuffledIndexArray = function() {
    
    var getRandomNumberFromTo = function(min, max) {
        var x = Math.floor(Math.random() * (max - min + 1) + min);
        return x;
    }            
    
    for (i=0; i < numberOfQuestions; i++) {
        //debugger;
        var selectedIndex = getRandomNumberFromTo(0,(workingArrayForShuffling.length-1));
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
        // TODO add clearInterval(timerDecrement) here if last answer has been selected
        timerDisplay.textContent = "Time: " + timer.toFixed(1);
    };
    // call reduction of timer variable each one tenth of a second
    var timerDecrement = setInterval(decreaseTimerVariable,100);
};

var displayQuestions = function(i){
    // display questions / answers
    questionDiv.textContent = questions[workingArrayForShuffling[i]].question;
    answerA.textContent = questions[workingArrayForShuffling[i]].answers[0];
    answerB.textContent = questions[workingArrayForShuffling[i]].answers[1];
    answerC.textContent = questions[workingArrayForShuffling[i]].answers[2];
    answerD.textContent = questions[workingArrayForShuffling[i]].answers[3];
    correctAnswerIs = questions[workingArrayForShuffling[i]].correctAnswer;
}


var quizProcess = function() {
    
    var processAnswer = function(evt){
        console.log("answerForm clicked");
        console.log(evt.target.textContent);
        console.log(evt.target.id);
        questionCounter++;
        if (correctAnswerIs == evt.target.id) {
            console.log("answer is correct");
            // turn off listener
            // bring up next question
        } else {
            console.log("answer is wrong");
            // turn off listener
            // bring up next question
        }
        //if (evt.target.textContent == questions)
            // if answer is correct else 
            // need to make sure user can only click once; turn off listener
            // Remove the event handler from <div>
// answerForm.removeEventListener("click", processAnswer); 
        if (questionCounter = numberOfQuestions - 1) {
            //stop answering questions; stop timer
        }
    }

    // hide the intro
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX document.getElementById("start").style.display = "none";
    //Begin clock
    timerCountdown();
    displayQuestions(questionCounter);
    answerForm.addEventListener("click", processAnswer); 
    // processAnswer();
            
};

createShuffledIndexArray();
startButton.addEventListener("click", quizProcess);


goBackButton.addEventListener("click", function(){console.log("go back button")});
clearHighScoresButton.addEventListener("click", function(){console.log("clear high scores button")});


/*    
    +Intro
    Select 5 questions
    +Display question and open event listener
        accept an answer
        display Correct! or Wrong!
        wrong answers reduce clock
        bring up next question .5 seconds
    Score is the amount of time left on the clock
	Check the clock frequently and end game when it expires
	Show score
	Offer ability to record high score
		Store and retrieve high scores
	Offer "play again?"
*/
//evt.target.style.backgroundColor = "red";
            

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

