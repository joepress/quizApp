var state = {
	questions: [],
	
	congrats:
		'congrats you got the answer correct, you are a genius!.'
	,
	
	failure:
		'unfortunatley you didnt study hard enought to get that one right.'
	,
	
	currentQuestionIndex:0,
	score:0
	}; // create a object called state and give it a few keys one with an array and two with strings and two with numbers.
	
var questionTemplate = 
	    "<div class='question'>"+
				"<h1 class='questionNumber'></h1>"+
				"<span class='questionText'></span>"+				
				"<form class='radioChoices'>"+
					"<input id='choiceOne'  name='answer' type='radio' required><label class='choiceOne'></label><br>"+
					"<input id='choiceTwo' name='answer' type='radio' required><label class='choiceTwo'></label><br>"+
					"<input id='choiceThree' name='answer' type='radio' required><label class='choiceThree'></label><br>"+
					"<input id='choiceFour' name='answer' type='radio' required><label class='choiceFour'></label><br>"+
					"<button class='submission' type ='submit'>Submit</button>"+
					"<button class='startOver'>Start Over</button>"+
				"</form>"+
			"</div>";	//template for the question i will build
				
	
function Question(text,choices,correct){
	this.text = text;
	this.choices = choices;
	this.correct = correct;
	
	}; // create a functiion with the three parameters, text,choices,correct, and assign them to the current text, choices, and correct.
	
	
	var questOne = new Question('Are the Knicks above or below five hundred?',['Above','Below','Even','Undefeated'],'Below');
	state.questions.push(questOne);
	
	var questTwo = new Question('Are the Bulls above or below five hundred?',['Above','Below','Even','Undefeated'],'Even');
	state.questions.push(questTwo);
	
	var questThree = new Question('Are the Thunder above or below five hundred?',['Above','Below','Even','Undefeated'],'Above');
	state.questions.push(questThree);
	
	var questFour = new Question('Are the Celtics above or below five hundred?',['Above','Below','Even','Undefeated'],'Above');
	state.questions.push(questFour);
	
	var questFive = new Question('Are the Timberwolves above or below five hundred?',['Above','Below','Even','Undefeated'],'Below');
	state.questions.push(questFive);
	
	//create a variable set it to new Question, which creates a new object adds the info we have placed through the Question parameters and than push that to the questions array inside the state object.
	
function renderQuestion (state){
	var element = $(questionTemplate);
	var quest = state.questions[state.currentQuestionIndex];
	element.find('.questionNumber').text(state.currentQuestionIndex + 1 +'/5');
	element.find('.questionText').text(quest.text);
	element.find('.choiceOne').text(quest.choices[0]);
	element.find('#choiceOne').val(quest.choices[0]);
	element.find('.choiceTwo').text(quest.choices[1]);
	element.find('#choiceTwo').val(quest.choices[1]);
	element.find('.choiceThree').text(quest.choices[2]);
	element.find('#choiceThree').val(quest.choices[2]);
	element.find('.choiceFour').text(quest.choices[3]);
	element.find('#choiceFour').val(quest.choices[3]);
	
	$('#questionContainer').html(element);
}// create the render function which will build my question.


function score(){
	if ($("input[name='answer']:checked").val() === state.questions[state.currentQuestionIndex].correct){
		state.score++;
		alert(state.congrats);
	}else{
		alert(state.failure);
	}
}																					 
	
function advanceQuestion(state){
	if(state.currentQuestionIndex == state.questions.length - 1){
		alert('Congrats on finishing the quiz, lets see what your score is: '+ state.score + '/5');
		resetApp();
	}else{
		renderQuestion(state);
		state.currentQuestionIndex++;
	}
	
}	// create the advanceQuestion function if the current question index is equal to the questions array length print final page if not render the question and add one to the currentQuestionIndex.
			
function resetApp(){
	$('#questionContainer').hide();
	$('.openingPage').show();
	state.score = 0;
	state.currentQuestionIndex = 0;
}			

$(document).ready(function(){
	$('.startButton').click(function(event){
		event.preventDefault();
		$('.openingPage').hide();
		$('#questionContainer').show();
		renderQuestion(state);
	})	
																	//event listener for when the start button is clicked prevent default than hide the opening page and render the question.	
	$(document).on('submit','.radioChoices',function(e){
		e.preventDefault();
		score();
		advanceQuestion(state);
		renderQuestion(state);	
	});
})

$(document).on('click','.startOver',function(e){
	e.preventDefault();
	e.stopPropagation();
	$('#questionContainer').hide();
	$('.openingPage').show();
})						