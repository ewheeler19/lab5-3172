// In this example, I want to create an interactive form that allows Newt Scamander create a sort of inventory of the Fantastic Beasts he's rescuing
// Here's what we'll need to do:
// 1. Grab the input a user enters into our form
// 2. Represent this input in a meaningful way, let's say an Object
// 3. Push the contents of that Object into an Array 
// 4. Reset our form so that the user can add a new creature if they want without having to manually delete the previous input
// 5. Display the new creature in our Array back to the user on our page

/*const myDogs = {
    name: 'Zelda',
    age: 6,
    city: 'Halifax'
}
console.log(myDogs.name);
console.log(myDogs['age']);

myDogs.age = 7;

const myArray = [10,20,30,40];

console.log(myArray[0]);

myArray.push(45); // add 45 to end of array

myArray.pop();

console.log(myArray.includes(30));

const myDiv = document.getElementById('MyDiv');
console.log(myDiv);

const newParagraph = document.createElement('p'); // create paragraph element on all pages using this script
newParagraph.textContent = 'This is a new paragraph'; //

myDiv.appendChild(newParagraph); // make the new paragraph contain the text conmtennt

document.getElementById();

document.querySelector('creatureHabitat'); // first match for ID called 'creatureHabitat' from HTML
document.querySelectorAll('form-group'); // all matches for class called 'orm-group' from HTML
*/

const creatureSanctuary = []; // create empty array creatureSanctuary

function addCreature() {
    // grab values from form
    const creatureName = document.getElementById('creatureName').value;
    const creatureType = document.getElementById('creatureType').value;
    const creatureHabitat = document.getElementById('creatureHabitat').value;

    const newCreature = { // create object with attributes from document
        name: creatureName,
        type: creatureType,
        habitat: creatureHabitat
    };
    creatureSanctuary.push(newCreature); // add new creature to empty array
    document.getElementById('addCreatureForm').reset(); // get form element and reset form
    displayCreatures();
}

// function for dispaying the creatures
function displayCreatures() {
    const creaturesDiv = document.getElementById('creatureSanctuary');
    creaturesDiv.innerHTML = ''; // have empty string in div
    const list = document.createElement('ul'); // create unordered list in displayCreature div in the html

    for (const creature of creatureSanctuary) { // loop through creatureSanctuary
        const listItem = document.createElement('li'); // create list in the div
        listItem.textContent = `${creature.name} - ${creature.type} (Habitat: ${creature.habitat})`;
        list.appendChild(listItem);
    }
    creaturesDiv.appendChild(list);
}

// add listener on the form in the document and trigger when submit button is used
document.getElementById('addCreatureForm').addEventListener('submit',
function(event){
    event.preventDefault();
    addCreature();
}) 

// remove a creature from creatureSanctuary array when button is clicked
document.getElementById('removeButton').addEventListener('click',
function(event){
    event.preventDefault();
    creatureSanctuary.pop();
    displayCreatures();
}) 
displayCreatures();