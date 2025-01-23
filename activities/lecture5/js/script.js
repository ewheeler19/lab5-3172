// Create an array of possible answers
const eightBallAnswers = ["It is certain.", "Reply hazy, try again.", "Don’t count on it",
    "It is decidedly so.", "Ask again later	My reply is no.",
    "Without a doubt.","Better not tell you now	My sources say no.",
    "Yes definitely.","Cannot predict now	Outlook not so good.",
    "You may rely on it.","Concentrate and ask again."];

// Add fortune cookie answers as well
const fortuneCookieAnswers = ["Do not be afraid of competition.",
    "You should be able to undertake and complete anything.","You love peace.",
    "You will receive money from an unexpected source.","Stay healthy. Walk a mile.",
    "Experience is the best teacher.","Dance as if no one is watching."]

// Add the arrays together
answers = eightBallAnswers.concat(fortuneCookieAnswers);
  
// Create a function to fetch the question the user has asked 	
function askQuestion() {
	const userQuestion = document.getElementById('userQuestion').value;
    // Our function should also check from an empty value
	if (userQuestion === '') {
		alert('Please enter a question.');
		return; 
	}

  
// Select a random answer from your array 
const randomIndex = Math.floor(Math.random() * answers.length);
const answer = answers[randomIndex];

// Display the question and answer back to the user
document.getElementById('answer').textContent = `You asked: ${userQuestion}; `;

document.getElementById('answer').textContent += 'The Magic 8-Ball says: ' + answer;
// And, log the question and answer to the console
console.log(`Question: ${userQuestion}`);
console.log(`Answer: ${answer}`);
}