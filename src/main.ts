import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Knockoff Cookie Clicker 🍪";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//clicks counter taken from lecture video
//function updateCounter used Brace to create the if statement and help understand the code 
//went to Bahar's office hours for step 4

let clicks = 0;
let lastTime = 0; 
let clickIncrement = 0; 
const button = document.createElement("button");
button.innerHTML = "Cookie! 😄";


function updateCounter(currentTime: number) {
  if (clicks >= 0) {
      const timeElapsed = (currentTime - lastTime) / 1000;  // seconds 
      clickIncrement += timeElapsed; 
      
      if(clickIncrement >= 1){
        clicks++
        clickIncrement = 0; 
      }

      button.innerHTML = `Cookie 😄 (${clicks})`;
  }
  lastTime = currentTime;
  requestAnimationFrame(updateCounter);  // calls frames 
}

//watched youtube video to understand how to use setInterval
//https://www.youtube.com/watch?v=JRevaOwNKTI

// setInterval(() => {
//   clicks++;
//   button.innerHTML = `Cookie 😄 (${clicks})`;
//   button.onclick = () => {
//     clicks = clicks + 1;
//     button.innerHTML = `Cookie 😄 (${clicks})`;
//     console.log(clicks);
//   };
// }, 1000);

button.onclick = () => {
  clicks += 1; 
  button.innerHTML = `Cookie 😄 (${clicks})`;
};

app.append(button); 

requestAnimationFrame(updateCounter);