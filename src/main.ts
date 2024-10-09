import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Knockoff Cookie Clicker 🍪";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const description = document.createElement("p");
description.innerHTML = "Click the cookies to earn points and upgrade your clicks!";
description.style.fontStyle = "bold";
description.style.marginTop = "-5px"; // Remove top margin to bring it closer to the header
description.style.marginBottom = "30px"; // Optional spacing adjustment below
app.append(description);

const description2 = document.createElement("p");
description2.innerHTML = "Growthrate!";
description2.style.fontStyle = "italic";
description2.style.marginTop = "-25px"; // Remove top margin to bring it closer to the header
description2.style.marginBottom = "30px";
app.append(description2);

// Game state variables
let clicks = 0; 
let lastTime = 0; 
let clickIncrement = 0; 
let growthRate = 0;
let num_cakemix = 0; //Counter for each upgrade 
let num_chococlatechip = 0; 
let num_hotchocolate = 0; 

// Create "Cookie" button
const button = document.createElement("button");
button.innerHTML = "Cookie! 😄";

// Create "Cake Mix" upgrade button
const upgrade = document.createElement("button");
upgrade.innerHTML = "Purchase Cookie Mix (10 clicks)";
upgrade.disabled = true; // Disabled until 10 manual clicks are reached

// Style the upgrade button
// Brace wrote this section of code
upgrade.style.display = "block";
upgrade.style.margin = "10px auto";
upgrade.style.padding = "10px 20px";
upgrade.style.fontSize = "16px";

//second upgrade button 
const second_upgrade = document.createElement("button");
second_upgrade.innerHTML = "Purchase Chocolate Chips (100 clicks)";
second_upgrade.disabled = true; // Disabled until 10 manual clicks are reached

second_upgrade.style.display = "block";
second_upgrade.style.margin = "10px auto";
second_upgrade.style.padding = "10px 20px";
second_upgrade.style.fontSize = "16px";
second_upgrade.disabled = true; 

const third_upgrade = document.createElement("button");
third_upgrade.innerHTML = "Purchase Hot Chocolate (1000 clicks)";
third_upgrade.disabled = true; // Disabled until 10 clicks are reached

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

  // Auto-increment clicks based on growth rate
  // Used Brace to write this section of code
  clickIncrement += timeElapsed * growthRate;
  if (clickIncrement >= 1) {
    clicks += Math.floor(clickIncrement);
    clickIncrement %= 1;
    button.innerHTML = `Cookie! 😄 (${clicks})`;
  }

  // Enable upgrade button when player has 10 manual clicks
  // Went to Bahar's office hours to understand the loop
  if (clicks >= 10) {
    upgrade.disabled = false;
  }
  if (clicks >= 100){
    second_upgrade.disabled = false; 
  }
  if (clicks >= 1000){
    third_upgrade.disabled = false; 
  }

  description2.innerHTML = `Growth rate: ${growthRate} cookies per second`;

  requestAnimationFrame(updateCounter); // Continue the game loop
}

// Handle cookie button clicks
button.onclick = () => {
  clicks += 1;
  button.innerHTML = `Cookie! 😄 (${clicks})`;
};

// Handle upgrade purchase
upgrade.onclick = () => {
  if (clicks >= 10) {
    clicks -= 10; // Deduct 10 clicks for the upgrade
    growthRate += 0.1; // Increase growth rate by 1
    num_cakemix++; 
    upgrade.innerHTML = `Purchase Cake Mix (10 clicks, Growth Rate: 0.1, ${num_cakemix} owned)`;
  }

  if (clicks < 10) {
    upgrade.disabled = true;
  }
};

// re-used first upgrade event listener for the second and third upgrades 
second_upgrade.onclick = () => { 
  if (clicks >= 100) {
    clicks -= 100; // Deduct 100 clicks for the upgrade
    growthRate += 2; // Increase growth rate by 1
    num_chococlatechip++; 
    second_upgrade.innerHTML = `Purchase Chocolate Chip (100 clicks, Growth Rate: 2, ${num_chococlatechip} owned)`;
  }

  if (clicks < 100) {
    second_upgrade.disabled = true;
  }
};

third_upgrade.onclick = () => {
  if (clicks >= 1000) {
    clicks -= 1000; // Deduct 100 clicks for the upgrade
    growthRate += 50; // Increase growth rate by 1
    num_hotchocolate++; 
    third_upgrade.innerHTML = `Purchase Hot Chocolate (1000 clicks, Growth Rate: 50, ${num_hotchocolate} owned)`;
  }

  if (clicks < 1000) {
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
