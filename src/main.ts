import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Knockoff Cookie Clicker 🍪";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let clicks = 0;
const button = document.createElement("button");
button.innerHTML = "Cookie! 😄";

//clicks counter taken from lecture video
//watched youtube video to understand how to use setInterval
//https://www.youtube.com/watch?v=JRevaOwNKTI

setInterval(() => { 
    clicks++; 
    button.innerHTML = `Cookie 😄 (${clicks})`;
    button.onclick = () => {
        clicks = clicks + 1; 
        button.innerHTML = `Cookie 😄 (${clicks})`;
        console.log(clicks)
    } 
}, 1000);

app.append(button);
