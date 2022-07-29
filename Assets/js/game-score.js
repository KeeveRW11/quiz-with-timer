class Question
{
  constructor(question , options , answer)
  {
    this.question = question;
    this.options = options;
    this.answer= answer;
  }
}
//Questions, choices and answers all in an array
let QuestionsArr = [ 
    new Question("Which of the following is correct about features of JavaScript?",["JavaScript is is complementary to and integrated with HTML.","JavaScript is open and cross-platform.","Both of the above.","All of the above."],"Both of the above."),
    new Question("Which of the following type of variable is visible everywhere in your JavaScript code?",["global variable","local variable","Both of the above","None of the above."],"global variable"),
    new Question("Which of the following function of Array object joins all elements of an array into a string?",[ "pop()","push()","join()","map()"],"join()"),
    new Question("How can a datatype be declared to be a constant type?",[ "const","var","let","constant"],"const"),
    new Question("BONUS: What's Your Favorite City?" ,["Vancouver","Toronto","Montreal"],"Toronto")
  
];

let QuestionNumber =0;
let timerSubstract=0;
let score=0;

//Function to start the Quiz
function Start() 
{
  window.alert("Start Quiz OK = Start"); //WHEN I click the start button THEN a timer starts and I am presented with a question
  LoadQuestion(0);
  CountDown();
  
}
// Load the New question and list of options
function LoadQuestion(index)
{
  var ul = document.getElementById("quiz-choices");
  var QuestionP = document.getElementById ("quiz-questions");
  var QuestionObject = QuestionsArr[index];
  //Assign Question
  QuestionP.innerHTML = QuestionObject.question;
  //Assign Choices
  for(let i =0 ; i< QuestionObject.options.length;i++)
  {
    var li = document.createElement("li");
    var checbox = document.createElement("input");
    checbox.type="radio";
    checbox.name= "choice";
    checbox.id= QuestionObject.options[i];
    checbox.value= QuestionObject.options[i];
    checbox.class="answer";
    var label =document.createElement("label");
        label.id="choice_"+QuestionObject.options[i];
        label.appendChild(document.createTextNode(QuestionObject.options[i]));
        li.appendChild(checbox);
        li.appendChild(label);
        ul.appendChild(li);
  }
}

/* On Submit , Add/Substract the score , go to the next question*/
function SubmitAnswer()
{
   var CurrentQuestion = QuestionsArr[QuestionNumber];
   //Check which option was selected
  for(let i =0 ; i< CurrentQuestion.options.length;i++ )
  {
  var Answer = document.getElementById(CurrentQuestion.options[i]);
      if(Answer.checked==true)
     {
       //Check if that's the correct Answer
        if(Answer.id == CurrentQuestion.answer )
        {
           RemoveQuestion();
           QuestionNumber++;
           AddScore();
           if(QuestionNumber < QuestionsArr.length)
           {
             LoadQuestion(QuestionNumber); 
           }else
           {
             // FINAL Question
             // Add a Message showing your score
             // Add a message saying congrats you have finished
             //hide the button
             TimeIsUp();
             timerSubstract=timerSubstract+60; // Finished timmer
           }
          break;
        }else
        {
          SubstractScore();
          timerSubstract=timerSubstract+5; // Substract 5 seconds from the timer if they get it wrong
           RemoveQuestion();
           QuestionNumber++;
           if(QuestionNumber < QuestionsArr.length)
           {
             LoadQuestion(QuestionNumber); 
           }else
           {
             // FINAL Question
             // Add a Message showing your score
             // Add a message saying congrats you have finished
             //hide the button
             TimeIsUp();
             timerSubstract=timerSubstract+60; // Finished the Timer
           }
          break;
        }
     }
  }
}

function RemoveQuestion()
{
  const UL = document.getElementById("quiz-choices");
  while(UL.firstChild)
  {
    UL.removeChild(UL.lastChild);
  }
}
//Add points and subtract points
function AddScore()
{
  score = score+10;
}
function SubstractScore()
{
  if(score>0)
  {
    score = score -10;
  }
}
// Function defines time
function CountDown()
{
  var CtDDate = new Date();
      CtDDate.setMinutes(CtDDate.getMinutes() + 1); // Define how many minutes on timer , for now it set to 1 minute
  var CountDownDate = new Date(CtDDate).getTime();
    
  var x = setInterval(function() {
      
      var now = new Date();
      if(timerSubstract > 0)
      {
        now.setSeconds(now.getSeconds() +  timerSubstract);
      }
      var nowTime = now.getTime();
      //Updates the countdown every 1 second
      var distance = CountDownDate - nowTime;  
    console.log("Distance Countdown", distance);
     // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML =  minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    TimeIsUp();
  }
  },1000);
}
//End,Fin,Done
function TimeIsUp()
{
  document.getElementById("submit-button").style.visibility="hidden";
  RemoveQuestion();
  document.getElementById("quiz-questions").innerHTML="Finished! <br/> Score :" +score;
}




