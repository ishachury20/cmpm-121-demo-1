import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Knockoff Cookie Clicker 🍪";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Game state variables
let clicks = 0;         // Total clicks (including auto-increment)
let initial_clicks = 0;   // Manual clicks only (used to unlock upgrades)
let lastTime = 0;       // Tracks the last frame time
let clickIncrement = 0; // time for auto-increment
let growthRate = 0;     

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

// Ensure app container is centered
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
  if (initial_clicks >= 10) {
    upgrade.disabled = false;
  }

  requestAnimationFrame(updateCounter); // Continue the game loop
}

// Handle cookie button clicks
button.onclick = () => {
  clicks += 1;
  initial_clicks += 1; // Count manual clicks towards the upgrade unlock
  button.innerHTML = `Cookie! 😄 (${clicks})`;

  // Check if the player has 10 manual clicks and enable the upgrade button
  if (initial_clicks >= 10) {
    upgrade.disabled = false;
  }
};

// Handle upgrade purchase
// Watched 
upgrade.onclick = () => {
  if (clicks >= 10) {
    clicks -= 10;        // Deduct 10 clicks for the upgrade
    growthRate += 1;     // Increase growth rate by 1
    upgrade.innerHTML = `Purchase Cake Mix (10 clicks, Growth Rate: ${growthRate})`; 
    button.innerHTML = `Cookie! 😄 (${clicks})`; 
  }

  // Disable the upgrade button if the player doesn't have enough clicks after purchasing
  if (clicks < 10) {
    upgrade.disabled = true;
  }
};

// Add buttons to the DOM
app.append(button);
app.append(upgrade);

// Start the game loop
requestAnimationFrame(updateCounter);