// DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Handle submissions
form.addEventListener("submit", function(e) {
  event.preventDefault();

  //Values from forms
  const name = nameInput.value;
  const team = teamSelect.value;

  console.log(name, team);
})