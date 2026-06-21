// DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Attedance Tracker
let count = 0;
const maxCount = 50;


//Handle submissions
form.addEventListener("submit", function(e) {
  event.preventDefault();

  //Values from forms
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions(0).text;

  console.log(name, team, teamName);

  //Count increments
  count++
  console.log("Total Check-ins:", count);

  //Progress bar Update
  const percentage = Math.round((count/maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);

  //Team Counter Update
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
  
  //Welcome Message
const message = `WELCOME! ${name} from ${teamName}`;
console.log(message);

form.reset();
});