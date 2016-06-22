/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess = [];
var winningNumber = 0;
var totalGuesses = 5;    



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	winningNumber = Math.floor(Math.random()*100);
	console.log("win: ",winningNumber);
	return winningNumber;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	
	var guess = $('#playersGuessVal').val();
	var guessVal = Number(guess);
	if (guess.length != 0 && guessVal >= 0 && guessVal <=100)
	{
		playersGuess.push(guessVal);
		console.log("player submitted guess: ",guessVal);
		$('#playersGuessVal').val("");
		checkGuess();	
	}
	else
	{
		//
		$('#feedback').text("Please submit proper value.");
	}
	
	
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(lastGuess){
	// add code here
	//var lastGuess = playersGuess[playerGuess.length-1];
	if (lastGuess< winningNumber)
	{
		return "lower";
	}
	else 
		return "higher";
}

function howFar(lastGuess)
{
	var digits = Math.ceil(Math.abs(lastGuess-winningNumber)/5)*5;
	if (digits > 20)
		return "more than 20";
	else
		return digits;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	//console.log("checking guess");
	var feedback;
	var lastGuess = playersGuess.pop();
	
	// add code here

	if (lastGuess === winningNumber)
	{
		
		feedback = "Player Wins!"; 
		$(".site-wrapper").css("color","red");
	}
		
	else if (playersGuess.indexOf(lastGuess) > -1)
	{
		//duplicate exist so don't sore
		feedback = "Submitted a duplicate guess";

	}
	else{
		feedback = "Try Again. ";
		feedback = "Your guess was "+lowerOrHigher(lastGuess)+" and "+howFar(lastGuess)+" digits away";
		totalGuesses--;
		playersGuess.push(lastGuess);

	}
	$('#feedback').text(feedback);
	$('#guess-count').text(totalGuesses+" Guess Remaining");
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	if ($('#hint-msg').text().length === 0 )
	{
		var randomArray = [];
		for (var i =0; i<3; i++)
		{
			randomArray.push(Math.floor(Math.random()*100));
		}

		randomArray[Math.floor(Math.random()*3)]=winningNumber;

		$('#hint-msg').text("One of these values is the winning number [" + randomArray.toString() +"], submit a guess!");
	}
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	totalGuesses = 5;
	$('#guess-count').text(totalGuesses+" Guess Remaining");
	$('#feedback').text("");
	$('#hint-msg').text("");
	$('#playersGuessVal').text("");
	$(".site-wrapper").css("color","black");
	generateWinningNumber();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() { 
	generateWinningNumber();
	$('#playerGuessPress').on('click',playersGuessSubmission);
	//$('#playerGuessPress').on('keypress',playersGuessSubmission);

	$('#playersGuessVal').keydown(function(event){    
	    if(event.keyCode==13){
	       $('#playerGuessPress').trigger('click');
	    }
	});
	$('#hint').on('click',provideHint);
	$('#play-again').on('click',playAgain);
	
		

});
