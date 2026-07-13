
// PART 1: Class, Instantiation, and Rendering


// 1. Creating a blueprint which is a (Class) for the real-world object.
class Keychain {
    constructor(character, color, price) {
        this.character = character;
        this.color = color;
        this.price = price;
    }
}

// 2. This block Instantiates an object to test it out.
const testKeychain = new Keychain('Gengar', 'Purple', 80);
console.log("Testing single object creation:", testKeychain);

// 3. This Block creates an array containing 3 to 5 of these objects.
let inventory = [
    new Keychain('Gengar', 'Purple', 80),
    new Keychain('Cubone', 'Bone White', 85),
    new Keychain('Pikachu', 'Yellow', 75)
];

// 4. This Block is a Function to render the array into the HTML document.
function renderList() {
    // Target the empty div in the HTML
    const listContainer = document.getElementById('inventory-list');
    
    // This Block clears out the container first so it won't duplicate items when re-rendering
    listContainer.innerHTML = ''; 

    // This Block then loops through the array. 'index' is used to identify which item to edit/delete later.
    inventory.forEach((item, index) => {
        // This Block creates a new div element for each keychain
        const card = document.createElement('div');
        card.className = 'keychain-card';
        
        // This Block Injects HTML inside that new div using template literals (the backticks)
        card.innerHTML = `
            <strong>${item.character}</strong> - ${item.color} Filament (₱${item.price})
            <br><br>
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        
        // Attach the new div to the main container on the webpage
        listContainer.appendChild(card);
    });
}

// This Part here calls it once so the initial 3 items show up immediately on page load
renderList();


// ==========================================
// PART 2: Adding Items via Event Listeners
// ==========================================

// This function grabs the Add button from the HTML
const addBtn = document.getElementById('addBtn');

// Listens for a 'click' event on the button
addBtn.addEventListener('click', () => {
    // Grab the current values typed into the input boxes
    const charValue = document.getElementById('charInput').value;
    const colorValue = document.getElementById('colorInput').value;
    const priceValue = document.getElementById('priceInput').value;

    // Basic validation to ensure the fields aren't empty and has content
    if (charValue === '' || colorValue === '' || priceValue === '') {
        alert("Please fill out all fields!");
        return; 
    }

    // Create a new Keychain object using the input values
    const newItem = new Keychain(charValue, colorValue, parseFloat(priceValue));
    
    // This pushes to the array
    inventory.push(newItem);
    
    // Re-renders the Domain Object Model (DOM) to show the updated array
    renderList();

    // Clear the input boxes for the next entry
    document.getElementById('charInput').value = '';
    document.getElementById('colorInput').value = '';
    document.getElementById('priceInput').value = '';
});


// ==========================================
// PART 3: Delete and Edit Functionality
// ==========================================

// A function to delete an item based on its index in the array
function deleteItem(index) {
    // Array method .splice() removes items. (index to start at, how many to remove)
    inventory.splice(index, 1);
    
    // This Re-renders the Document Oject Model (DOM) so the deleted item disappears from the screen
    renderList();
}

// A function to edit a created item (Character, Color, and Price)
function editItem(index) {
    // 1. This function grabs the specific keychain we want to edit from the array
    const currentItem = inventory[index];

    // 2. This Asks the user for the new character name. 
    // The second part (currentItem.character) puts the existing name in the text box so they don't have to type it from scratch!
    const newChar = prompt("Edit Character (e.g. Gengar):", currentItem.character);
    
    // 3. It Asks for the new color
    const newColor = prompt("Edit Filament Color:", currentItem.color);
    
    // 4. Then it Asks for the new price
    const newPrice = prompt("Edit Price (PHP):", currentItem.price);

    // 5. Safety Check: If the user hits "Cancel" on any prompt, the result is 'null'. 
    // We only update the array if they actually filled out all three prompts.
    if (newChar !== null && newColor !== null && newPrice !== null) {
        
        // Update the object in our array with the newly typed values
        inventory[index].character = newChar;
        inventory[index].color = newColor;
        
        // It use parseFloat to turn the price text back into a proper number
        inventory[index].price = parseFloat(newPrice);
        
        // 6. Finally, This redraws the HTML list so the new changes appear on the screen instantly
        renderList();
    } else {
        // Optional: Function to know the edit was cancelled
        alert("Edit cancelled. The item was not changed.");
    }
}