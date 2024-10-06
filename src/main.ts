import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Knockoff Cookie Clicker 🍪";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//let clicks = 0; 
const button = document.createElement("button"); 
button.innerHTML = "Cookie! 😄"; 


app.append(button); 