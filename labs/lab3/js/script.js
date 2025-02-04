// create Item objects with attributes
class Item {
    constructor(name, type, price, quantity, description){
        this.name = name;
        this.type = type;
        this. price = price;
        this.quantity = quantity;
        this.description = description;
    }
}
const itemShopArray = []; // create empty array itemShopArray

function addItems() {
    // grab values from form
    const itemName = document.getElementById('itemName').value;
    const itemType = document.getElementById('itemType').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemDescription = document.getElementById('itemDescription').value;

    // create object with attributes from document
    const newItem = new Item (itemName, itemType, itemPrice, itemQuantity, itemDescription); 
 
    itemShopArray.push(newItem); // add new item to empty array

    console.log(itemShopArray);

    document.getElementById('addItemForm').reset(); // get form element and reset form
    displayItems();
    displayTotalValue();
    displayGetItem();
}

// function for dispaying the items
function displayItems() {
    const itemDiv = document.getElementById('itemShop');
    itemDiv.innerHTML = ''; // have empty string in div
    const list = document.createElement('ul'); // create unordered list in itemDiv div in the html

    for (const item of itemShopArray) { // loop through itemShopArray
        const listItem = document.createElement('li'); // create list in the div
        listItem.textContent = `Name: ${item.name}, Type: ${item.type}, Price: ${item.price}, Quantity: ${item.quantity}, Description: ${item.description}`;
        list.appendChild(listItem);
    }
    itemDiv.appendChild(list);
}

function displayTotalValue() {
    const itemDiv = document.getElementById('myDiv'); // get div in html
    itemDiv.innerHTML = ''; // have empty string in div
    const paragraph = document.createElement('p'); // create a <p> in the div
    paragraph.textContent = `Total value of entire inventory = ${calculateTotalValue()}` // insert what you want displayed in div
    itemDiv.appendChild(paragraph);
}

// calculateTotalValue function
function calculateTotalValue() {
    //if (itemShopArray === 0){return 0};
    let result = 0;
    for (const item of itemShopArray) { // loop through array
        const itemValue = parseFloat(item.price) * parseFloat(item.quantity); // get price and quantity of each item and multiply them together
        result += itemValue; // store values added up for each item as result
    }
    return result;
}

// getItem function that returns an item if found in inventory
function getItem(name) {
    // Convert both search term and inventory items to lowercase for case-insensitive comparison
    const normalizedName = name.trim().toLowerCase();

    for (let item of itemShopArray) {
        if (item.name.trim().toLowerCase() === normalizedName) {
            return item;
        }
    }
    return null;
}

// display getItem Function
function displayGetItem() {
    const getItemDiv = document.getElementById('getItemDiv'); // get the div in HTML
    const getItemInput = document.getElementById('getItemInput'); // get the input element
    getItemDiv.innerHTML = '';  // empty the div before adding new content

    const itemName = getItemInput.value.trim();  // get the input value and trim 

    if (itemName !== '') {  // if the input is not empty
        const item = getItem(itemName);  // call the getItem function with the input value

        const paragraph = document.createElement('p');  // Create a new paragraph to display the result
        if (item) {
            // if item is found, display its details
            paragraph.textContent = `Item found: Name: ${item.name}, Type: ${item.type}, Price: ${item.price}, Quantity: ${item.quantity}, Description: ${item.description}`;
        } else {
            // if no item is found, show a message indicating that
            paragraph.textContent = `No item found with the name "${itemName}" in the inventory.`;
        }
        getItemDiv.appendChild(paragraph);  // Append the paragraph to the div
    }
}

    // function to search for items by name or type
    function searchItems(query) {
        const searchResultsDiv = document.getElementById('searchResults'); // Create a div to display the results
        searchResultsDiv.innerHTML = ''; // Clear previous results

        if (query.trim() === '') { // if field is empty print message
            const noResultsParagraph = document.createElement('p');
            noResultsParagraph.textContent = 'Please enter a search term.';
            searchResultsDiv.appendChild(noResultsParagraph);
            return;
        }

        // loop through itemShopArray to find items that match the query
        const matchingItems = itemShopArray.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase());
        });

        if (matchingItems.length === 0) { // if no matching items are found
            const noResultsParagraph = document.createElement('p');
            noResultsParagraph.textContent = `No items found matching "${query}".`;
            searchResultsDiv.appendChild(noResultsParagraph);
        } else {
            // show matching items
            const resultsList = document.createElement('ul');
            matchingItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${item.name}, Type: ${item.type}, Price: ${item.price}, Quantity: ${item.quantity}, Description: ${item.description}`;
                resultsList.appendChild(listItem);
            });
            searchResultsDiv.appendChild(resultsList);
        }
    }

// add listener for search form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchQuery').value.trim(); // get the search query from input
    searchItems(searchQuery); 
});

// add listener on the form in the document and trigger when submit button is used
document.getElementById('addItemForm').addEventListener('submit',
function(event){
    event.preventDefault();
    addItems();
}) 

// remove an item from itemShopArray array when button is clicked
document.getElementById('removeButton').addEventListener('click',
function(event){
    event.preventDefault();
    itemShopArray.pop();
    displayItems();
    displayTotalValue();
    displayGetItem();
})
// Add event listener for the "Get item from list!" button
document.getElementById('getItemForm').addEventListener('submit', function(event) {
    event.preventDefault();  // prevent form from submitting and page reload
    displayGetItem();  
})

displayItems();
displayTotalValue();
displayGetItem();