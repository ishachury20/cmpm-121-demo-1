import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Blossom Quest 🌸";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// this section of code (alongside similar blocks of formatting) are written by Brace
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

const button = document.createElement("button");
button.innerHTML = "Plant Flowers";
button.style.fontStyle = "bold";
button.style.margin = "5px"; // Remove top margin to bring it closer to the header
button.style.marginBottom = "10px";
app.append(button);

interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number; 
}

const availableItems: Item[] = [
  { name: "Shrubs", cost: 10, rate: 0.1, purchased: 0 },
  { name: "Vines", cost: 100, rate: 2, purchased: 0 },
  { name: "Trees", cost: 1000, rate: 50, purchased: 0 }
];

let flowers = 0;
let growthRate = 0; 
let lastTime = 0;
let clickIncrement = 0;

const nameToIndexMap: { [key: string]: number } = {};

// Went to Ishaan's office hours to understand this part of the code 
// He explained creating a "map" that connected an upgrade to a specific number for easy retrieval
// Used Brace for this part of the code (and testing)
availableItems.forEach((item, index) => { 
  nameToIndexMap[item.name] = index; //0 = A, 1 = B, 2 = C
  const upgradeButton = document.createElement("button");
  upgradeButton.id = `upgrade-${index}`;
  upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} flowers, Rate: ${item.rate})`;

  upgradeButton.disabled = true; 

  upgradeButton.style.fontStyle = "bold";
  upgradeButton.style.margin = "5px"; 
  upgradeButton.style.marginBottom = "10px";

  upgradeButton.onclick = () => {
    if (flowers >= item.cost) {
      flowers -= item.cost;
      growthRate += item.rate;
      item.purchased += 1; 

      availableItems[index].cost *= 1.15;
      upgradeButton.innerHTML = `Plant ${item.name} (${availableItems[index].cost.toFixed(0)} flowers, Growth Rate: ${item.rate}, ${item.purchased} Planted)`;
      button.innerHTML = `Plant Flowers (${flowers.toFixed(0)})`;
    } 
  }

  // Unsure of how to append buttons vertically 
  app.append(upgradeButton)

});

// Re-used older code
button.onclick = () => {
  flowers += 1;
  button.innerHTML = `Plant Flowers (${flowers.toFixed(0)})`;
};

function updateCounter(currentTime: number) { //every frame
  const timeElapsed = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  clickIncrement += timeElapsed * growthRate;
  if (clickIncrement >= 1) {
    flowers += Math.floor(clickIncrement);
    clickIncrement %= 1;
    button.innerHTML = `Plant Flowers (${flowers.toFixed(0)})`;
  }

  // code written by Brace for upgradebutton in this section
  availableItems.forEach((item, index) => {
    const upgradeButton = document.querySelector(`#upgrade-${index}`) as HTMLButtonElement;
    upgradeButton.disabled = flowers < item.cost;
  });

  description2.innerHTML = `Growth rate: ${growthRate.toFixed(2)} flowers per second`;

  requestAnimationFrame(updateCounter);
} 

requestAnimationFrame(updateCounter);



