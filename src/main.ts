import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Blossom Quest 🌸";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const description = document.createElement("p");
description.innerHTML = "Click the buttons to earn flowers and upgrade your garden!";
description.style.fontStyle = "bold";
description.style.marginTop = "-5px"; // Remove top margin to bring it closer to the header
description.style.marginBottom = "30px"; // Optional spacing adjustment below
app.append(description);

const description2 = document.createElement("p");
description2.innerHTML = "Plant Growth Rate!";
description2.style.fontStyle = "italic";
description2.style.marginTop = "-25px"; // Remove top margin to bring it closer to the header
description2.style.marginBottom = "30px";
app.append(description2);

// Game state variables
let flowers = 0;
let lastTime = 0;
let clickIncrement = 0;
let growthRate = 0;
let num_shrubs = 0; 
let num_vines = 0;
let num_trees = 0;

let purchase_shrubs = 10; 
let purchase_vines = 100; 
let purchase_trees = 1000; 

// Create flower button
const button = document.createElement("button");
button.innerHTML = "Plant Flowers";

// Create shrub upgrade button
const upgrade = document.createElement("button");
upgrade.innerHTML = "Plant Shrubs (10 flowers)";
upgrade.disabled = true; // Disabled until 10 manual flowers are reached

// Style the upgrade button
// Brace wrote this section of code
upgrade.style.display = "block";
upgrade.style.margin = "10px auto";
upgrade.style.padding = "10px 20px";
upgrade.style.fontSize = "16px";

//second upgrade button (vines)
const second_upgrade = document.createElement("button");
second_upgrade.innerHTML = "Plant Vines (100 flowers)";
second_upgrade.disabled = true; // Disabled until 10 manual flowers are reached

second_upgrade.style.display = "block";
second_upgrade.style.margin = "10px auto";
second_upgrade.style.padding = "10px 20px";
second_upgrade.style.fontSize = "16px";
second_upgrade.disabled = true;

// thrid upgrade button (trees)
const third_upgrade = document.createElement("button");
third_upgrade.innerHTML = "Plant Trees (1000 flowers)";
third_upgrade.disabled = true; // Disabled until 10 flowers are reached

third_upgrade.style.display = "block";
third_upgrade.style.margin = "10px auto";
third_upgrade.style.padding = "10px 20px";
third_upgrade.style.fontSize = "16px";
third_upgrade.disabled = true;

app.style.display = "block";
app.style.textAlign = "center";

// Function to update the counter and manage auto-increment
// Used Brace to write and understand this loop
function updateCounter(currentTime: number) {
  const timeElapsed = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Auto-increment flowers based on growth rate
  // Used Brace to write this section of code
  clickIncrement += timeElapsed * growthRate;
  if (clickIncrement >= 1) {
    flowers += Math.floor(clickIncrement);
    clickIncrement %= 1;
    button.innerHTML = `Plant Flowers (${flowers})`;
  }

  // Enable upgrade button when player has 10 manual flowers
  // Went to Bahar's office hours to understand the loop
  if (flowers >= purchase_shrubs) {
    upgrade.disabled = false;
  }
  if (flowers >= purchase_vines) {
    second_upgrade.disabled = false;
  }
  if (flowers >= purchase_trees) {
    third_upgrade.disabled = false;
  }

  description2.innerHTML = `Growth rate: ${growthRate.toFixed(0)} flowers per second`;

  requestAnimationFrame(updateCounter); // Continue the game loop
}

// Handle cookie button flowers
button.onclick = () => {
 flowers += 1;
  button.innerHTML = `Plant Flowers (${flowers})`;
};

// Handle upgrade purchase
upgrade.onclick = () => { //first upgrade (shrubs) 
  if (flowers >= 10) {
    flowers -= 10; // Deduct 10 flowers for the upgrade
    console.log (flowers)
    growthRate += 0.1; // Increase growth rate by 1
    num_shrubs++;
    purchase_shrubs *= 1.15; 
    upgrade.innerHTML = `Plant Shrubs (${purchase_shrubs.toFixed(0)} flowers, Growth Rate: 0.1, ${num_shrubs} planted)`;
    button.innerHTML = `Plant Flowers (${flowers})`;
  }

  if (flowers < purchase_shrubs) {
    upgrade.disabled = true;
  }
};

// re-used first upgrade event listener for the second and third upgrades
// used Brace to cut off excess decimal points 
second_upgrade.onclick = () => { //second upgrade (vines)
  if (flowers >= 100) {
   flowers -= 100; // Deduct 100 flowers for the upgrade
    growthRate += 2; // Increase growth rate by 1
    num_vines++;
    purchase_vines *= 1.15; 
    second_upgrade.innerHTML = `Plant Vines (${purchase_vines.toFixed(0)} flowers, Growth Rate: 2, ${num_vines} planted)`;
    button.innerHTML = `Plant Flowers (${flowers})`;
  }

  if (flowers < purchase_vines) {
    second_upgrade.disabled = true;
  }
};

third_upgrade.onclick = () => {
  if (flowers >= 1000) {
    flowers -= 1000; // Deduct 100 flowers for the upgrade
    growthRate += 50; // Increase growth rate by 1
    num_trees++;
    purchase_trees *= 1.15; 
    third_upgrade.innerHTML = `Plant Trees (${purchase_trees.toFixed(0)} flowers, Growth Rate: 50, ${num_trees} planted)`;
    button.innerHTML = `Plant Flowers (${flowers})`;
  }

  if (flowers < purchase_trees) {
    third_upgrade.disabled = true;
  }
};

// Add buttons to the DOM
app.append(button);
app.append(upgrade);
app.append(second_upgrade);
app.append(third_upgrade);

// Start the game loop
requestAnimationFrame(updateCounter);
