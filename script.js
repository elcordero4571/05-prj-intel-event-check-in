// DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const celebrationMessage = document.getElementById("celebrationMessage");
const winningTeamName = document.getElementById("winningTeamName");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

const storageKey = "intel-summit-check-in-state";
const teamLabels = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};
const storage = (function () {
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
})();

// Attedance Tracker
let count = 0;
const maxCount = 50;
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};
let attendees = [];

function saveState() {
  if (!storage) {
    return;
  }

  const state = {
    count: count,
    teamCounts: teamCounts,
    attendees: attendees,
  };

  try {
    storage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    // Ignore storage errors so check-in still works in restricted browsers.
  }
}

function loadState() {
  if (!storage) {
    return;
  }

  let savedState = null;

  try {
    savedState = storage.getItem(storageKey);
  } catch (error) {
    return;
  }

  if (!savedState) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (typeof parsedState.count === "number") {
      count = parsedState.count;
    }

    if (parsedState.teamCounts) {
      teamCounts.water = parsedState.teamCounts.water || 0;
      teamCounts.zero = parsedState.teamCounts.zero || 0;
      teamCounts.power = parsedState.teamCounts.power || 0;
    }

    if (Array.isArray(parsedState.attendees)) {
      attendees = parsedState.attendees.map(function (attendee) {
        const team = attendee.team || "water";

        return {
          name: attendee.name || "Unnamed attendee",
          team: team,
          teamLabel: attendee.teamLabel || teamLabels[team] || team,
        };
      });
    }
  } catch (error) {
    try {
      storage.removeItem(storageKey);
    } catch (removeError) {
      // Ignore cleanup failures.
    }
  }
}

function getWinningTeam() {
  let winningTeam = "water";

  if (teamCounts.zero > teamCounts[winningTeam]) {
    winningTeam = "zero";
  }

  if (teamCounts.power > teamCounts[winningTeam]) {
    winningTeam = "power";
  }

  return winningTeam;
}

function renderAttendeeList() {
  attendeeList.innerHTML = "";

  if (attendees.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "attendee-empty";
    emptyItem.textContent = "No attendees have checked in yet.";
    attendeeList.appendChild(emptyItem);
    return;
  }

  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const listItem = document.createElement("li");
    listItem.className = "attendee-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "attendee-name";
    nameSpan.textContent = attendee.name;

    const teamSpan = document.createElement("span");
    teamSpan.className = "attendee-team";
    teamSpan.textContent = attendee.teamLabel || teamLabels[attendee.team];

    listItem.appendChild(nameSpan);
    listItem.appendChild(teamSpan);
    attendeeList.appendChild(listItem);
  }
}

function renderState() {
  attendeeCount.textContent = count;

  const percentage = Math.min((count / maxCount) * 100, 100);
  progressBar.style.width = `${percentage}%`;

  waterCount.textContent = teamCounts.water;
  zeroCount.textContent = teamCounts.zero;
  powerCount.textContent = teamCounts.power;

  renderAttendeeList();

  if (count >= maxCount && attendees.length > 0) {
    const winningTeam = getWinningTeam();
    winningTeamName.textContent = teamLabels[winningTeam];
    celebrationMessage.hidden = false;
  } else {
    celebrationMessage.hidden = true;
  }
}

loadState();
renderState();

//Handle submissions
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //Values from forms
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamLabels[team];

  if (name === "" || team === "") {
    return;
  }

  //Count increments
  count += 1;

  //Team Counter Update
  if (team === "water") {
    teamCounts.water += 1;
  }

  if (team === "zero") {
    teamCounts.zero += 1;
  }

  if (team === "power") {
    teamCounts.power += 1;
  }

  attendees.push({
    name: name,
    team: team,
    teamLabel: teamName,
  });

  saveState();
  renderState();

  //Welcome Message
  greeting.textContent = `Welcome, ${name}! You checked in for ${teamName}.`;
  greeting.style.display = "block";

  form.reset();
  nameInput.focus();
});
