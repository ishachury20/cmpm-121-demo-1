import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Blossom Quest";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// this section of code (alongside similar blocks of formatting) are written by Brace
const description = document.createElement("p");
description.innerHTML =
  "Click the buttons to grow flowers and upgrade your garden!";
description.style.fontStyle = "bold";
description.style.marginTop = "-25px"; // Remove top margin to bring it closer to the header
description.style.marginBottom = "10px"; // Optional spacing adjustment below
description.style.color = "#2f914c";  
app.append(description);

const description2 = document.createElement("p");
//description2.innerHTML = "Plant Growth Rate!";
description2.style.fontStyle = "italic";
description2.style.marginTop = "-25px"; // Remove top margin to bring it closer to the header
description2.style.marginBottom = "10px";

app.append(description2);

const image = document.createElement("img");

// Set the source of the image
image.src = "Plants1.png"; // Replace with your image URL

image.style.width = "250px"; // Width can be set in pixels or percentage
image.style.height = "auto"; // Maintain the aspect ratio
image.style.margin = "0px";

app.append(image)

const button = document.createElement("button");
button.innerHTML = "Plant Flowers";
button.style.fontStyle = "bold";
button.style.margin = "5px"; // Remove top margin to bring it closer to the header
button.style.marginBottom = "10px";
button.style.backgroundColor = "#edc566"
app.append(button);

interface Item {
  name: string;
  blurb: string; 
  cost: number;
  rate: number;
  purchased: number;
  color: string; 
}

const availableItems: Item[] = [
  { name: "Shrubs", blurb: "Lush greenery, perfect for neat borders and cozy spaces", cost: 10, rate: 1, purchased: 0, color: "#8FBC8F" },
  { name: "Hedges", blurb: "Stylish barriers that shape your garden", cost: 100, rate: 2, purchased: 0, color: "#5c9c5c" },
  { name: "Vines", blurb: "Elegant climbers that add height and texture", cost: 500, rate: 5, purchased: 0, color: "#3b9a65" }, 
  { name: "Trees", blurb: "Majestic giants offering shade and beauty", cost: 1000, rate: 10, purchased: 0, color: "#2E8B57" },
  { name: "Fruit Trees", blurb: "Grow delicious fruits while adding lush greenery to your garden", cost: 2500, rate: 15, purchased: 0, color: "#157d43" }
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
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.alignItems = "center";
  buttonContainer.style.marginBottom = "5 px";

  nameToIndexMap[item.name] = index; //0 = A, 1 = B, 2 = C
  const upgradeButton = document.createElement("button");
  upgradeButton.id = `upgrade-${index}`;
  upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} flowers, Rate: ${item.rate})`;

  upgradeButton.disabled = true;

  //upgradeButton.style.fontStyle = "bold";
  upgradeButton.style.margin = "8px";
  upgradeButton.style.backgroundColor = availableItems[index].color; 

  upgradeButton.onclick = () => {
    if (flowers >= item.cost) {
      flowers -= item.cost;
      growthRate += item.rate;
      item.purchased += 1;

      availableItems[index].cost *= 1.15;
      upgradeButton.innerHTML = `Plant ${item.name} (${availableItems[index].cost.toFixed(0)} flowers, Growth Rate: ${item.rate}, ${item.purchased} Planted)`;
      button.innerHTML = `Plant Flowers (${flowers.toFixed(0)})`;
    }
  };

  //app.append(upgradeButton);
  const blurbButton = document.createElement("button");
  blurbButton.innerHTML = `More about ${item.name}`;
  
  blurbButton.onclick = () => {
    // Display blurb alert or implementation detail
    alert(`${item.blurb}`);
  };
  blurbButton.style.backgroundColor = availableItems[index].color; 

  buttonContainer.append(upgradeButton, blurbButton);
  app.append(buttonContainer);
});

// Re-used older code
button.onclick = () => {
  flowers += 1;
  button.innerHTML = `Plant Flowers (${flowers.toFixed(0)})`;
};

function updateCounter(currentTime: number) {
  //every frame
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
    const upgradeButton = document.querySelector(
      `#upgrade-${index}`,
    ) as HTMLButtonElement;
    upgradeButton.disabled = flowers < item.cost;
  });

  description2.innerHTML = `Plant ${growthRate.toFixed(0)} flower(s) per second`; 
  description2.style.color = "#237a3e"; 

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);