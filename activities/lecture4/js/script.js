// Ask user for their name
let name = prompt("What is your name?");

//Ask the user for their age and make sure it's a valid number
let age = parseInt(prompt("How old are you?"), 10);

//If the input age is not a valid number, ask again
while (isNaN(age) || age <= 0) {
    age = parseInt(prompt("Please enter a valid age: "), 10);
}

//Ask the user if they are a student
let isStudent = confirm("Are you a student?");

//age in 8 years
let futureAge = age + 8;

//Construct the message to display
let studentStatus = isStudent ? "a student" : "not a student";
let message = `${name} is ${age} years old, and in 8 years they will be ${futureAge}. They are currently ${studentStatus}.`;

//Display the message on the web page
document.body.innerHTML = `<p>${message}</p>`;

