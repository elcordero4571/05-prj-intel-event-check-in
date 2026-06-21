// DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

//Attedance Tracker
let count = 0;
const maxCount = 50;

//Handle submissions
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //Values from forms
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  //Count increments
  count += 1;
  attendeeCount.textContent = count;

  //Progress bar Update
  const percentage = Math.min((count / maxCount) * 100, 100);
  progressBar.style.width = `${percentage}%`;

  //Team Counter Update
  if (team === "water") {
    waterCount.textContent = parseInt(waterCount.textContent, 10) + 1;
  }

  if (team === "zero") {
    zeroCount.textContent = parseInt(zeroCount.textContent, 10) + 1;
  }

  if (team === "power") {
    powerCount.textContent = parseInt(powerCount.textContent, 10) + 1;
  }

  //Welcome Message
  greeting.textContent = `Welcome, ${name}! You checked in for ${teamName}.`;
  greeting.style.display = "block";

  form.reset();
  nameInput.focus();
});
