(function(){

// initialize variables
var poses = ['half moon', 'boat', 'cobra', 'plow', 'standing bow', 'bridge', 'crane', 'ext mountain', 'down dog', 'warrior'];
var gameCommentary = ['Unroll your mat. It is time to guess', 'Warmming warming up up up', 'I feel the heat...', 'Did I see a drop of sweat on your mat?', 'So hot in. Hot in hurr', 'Who invented HOT yoga anyway?', 'We are all just guessing when it comes to yoga right?', 'Those sweat glands are getting a workout', 'Really? I am done. Namaste to the heat'];
var randIndex = 0;
var gamePose = poses[randIndex];
var numWins = 0, numLose = 0, maxGuess = 12;
var guessLeft = maxGuess, pastGuess = []; 
var gameBoard = '_';
var currentGuess = 'a';

// function to set up a new game
function gameSet(){
	randIndex = Math.floor( Math.random() * poses.length);
	gamePose = poses[randIndex];
	guessLeft = maxGuess;
	pastGuess = [];
	gameBoard = createDashes(gamePose,'');

	console.log("Pose to guess " + gamePose); 

	document.getElementById('yogaPose').style.cssText = 'background-position-x: '+ -150*randIndex + 'px; background-position-y: 0px;';
	document.getElementById('guessLeft').innerHTML = guessLeft + ' guesses left';
	document.getElementById('mobileKey').value = '';
	document.getElementById('pastGuess').innerHTML = '';
	document.getElementById('gameComment').innerHTML = gameCommentary[0];
	document.getElementById('poseName').innerHTML = gameBoard;
}

// invoke function on load
gameSet();


// function to determine if game play should occur
// invoked on key click
document.body.onkeypress = function(event){ 
	var k = event.key.match(/[A-Za-z]/);
	if( k && pastGuess.indexOf(currentGuess = k[0].toLowerCase()) == -1 ){
		gamePlay();
	}
};
document.querySelector('input').onchange = function( event ){
	var k = event.target.value[event.target.value.length -1] ;
	if( k.match(/[A-Za-z]/) && pastGuess.indexOf(currentGuess = k.toLowerCase())){
		gamePlay();
	}
	document.querySelector('input').value = '';
};


// function to execute game play
function gamePlay(){
	console.log('Playing guess ' + currentGuess);
	guessLeft --;
	pastGuess.push(currentGuess);

	document.getElementById('pastGuess').innerHTML += currentGuess;
	document.getElementById('guessLeft').innerHTML = guessLeft + ' guesses left';

	
	var c = Math.min(maxGuess - guessLeft, gameCommentary.length - 1);
	document.getElementById('gameComment').innerHTML = gameCommentary[c];


	// check if this is a correct guess
	if( findIndexes(gamePose, currentGuess).length > 0 ){

		gameBoard = createDashes(gamePose, pastGuess) ;
		document.getElementById('poseName').innerHTML = gameBoard;

	} 

	// check this is game-ending (either win or out of guesses)
	// issue with using this method for poses that have a space in the name
	if( gameBoard.indexOf('_') == -1 ){

		numWins ++;
		document.getElementById('gameWins').innerHTML = numWins + ' wins';
		gameSet();

		document.querySelector('.modal > h1').innerHTML = 'Way to Win';
		document.querySelector('.game-modal').style.display = 'block';

	}else if ( guessLeft <= 0 ){

		numLose ++;
		document.getElementById('gameLoses').innerHTML = numLose + ' utter failures';
		gameSet();

		document.querySelector('.modal > h1').innerHTML = 'No Inner Peace for You';
		document.querySelector('.game-modal').style.display = 'block';

	} else {
		// this would be easier with jquery
		document.getElementById('yogaPose').style.cssText = 'background-position-x: '+ -150*randIndex + 'px; background-position-y: ' + Math.max(-1350, -150 * (maxGuess - guessLeft)) + 'px;'; 
	}

}


// function to find all indexes of a letter (lettr) within a string (str)
// Example: (l, hello) will return [2 3]
function findIndexes(str, letter){
	var foundIndexes = [];
	for(i = 0; i < str.length ; i++){
		if( str[i] === letter){ foundIndexes.push(i); }
	}
	return foundIndexes;
}

// function to create a string of underscores to mask a letter of a word unless the letter is within the letters array
// Example: (hello, ['h', 'l']) will return "h_ll_"
function createDashes(word, letters){
	var allDashes = '';

	for(i = 0; i < word.length; i++){
		
		if( letters.indexOf(word[i]) === -1 ){
			word[i] == ' ' ? allDashes += '  ' : allDashes += '_ ';
		} else{
			allDashes += word[i];
		}
	}

	return allDashes;

}
})();