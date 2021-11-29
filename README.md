# Coding Quiz

## Fourth Challenge for UC Berkeley Extension Full-Stack Developer Bootcamp Course

This website is the completed code for the fourth "challenge" of the course, to create a coding quiz, which included these instructions:
* Present coding questions to the user
* The quiz is timed; the score on the quiz reflects the amount of time left unused
* When a question is answered wrongly, time should be subtracted from the timer
* Provide the option to save initials to a high score list that is displayed and stored in localStorage for later use

## What Was Done (and Not Done)

1. Developed wireframe and `html` code to display the coding quiz.
2. Used JavaScript to control the visibility of various sections of the webpage using `style.display`.
3. Used JavaScript to manage the user's interaction with the coding quiz.  This includes the timer, the display of questions, review of answers provided by the user, input of high-score initials, and the high score list display.
4. An array of objects is used to store the quiz questions, which are drawn at random from this array.
5. An array of objects is also used to store the high scores, which are uploaded to, and downloaded from, `localStorage` using `setItem()`, `getItem()`, `JSON.stringify()`, and `JSON.parse()` methods.
6. This challenge made heavy use of the `document.getElementById()` method to, for example, display questions (using `textContent`), receiving questions (using `addEventListener`), and for changing visibility, as noted above.

I believe the completed code meets the challenge criteria, however there is an item that could be improved.  The code currently requires the correct answer string to match the `id` of the element that contains the correct answer--and this is not necessarily obvious to a future editor of the code, which could lead to bugs.  This is mentioned in the comments, which would probably avoid an issue.  Nevertheless, I suspect there is a way to avoid having to match strings that are in two different files and I think this change would be an improvement.  I have made this an issue on GitHub.
  
## Link to Live Password Generator
  
The live password generator webpage can be found at this link: 
https://stuart-rickard.github.io/coding-quiz/