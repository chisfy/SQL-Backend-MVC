// Function to retrieve and display a list of all dogs
async function retrieveAndDisplayAllDogs() {
  // Fetch all dog data
  const response = await fetch(`http://localhost:3000/dogs/`);

  if (!response.ok) {
    alert("Oh no, no dog could be found try again");
    console.log("Oh no, no dog could be found try again");
    console.log(`Status: ${response.status}`);
    return;
  }
  const dogs = await response.json();
  const dogsArray = await dogs.data;

  const dogList = document.getElementById("dog-list");
  // Clear existing content in the dog list
  dogList.innerHTML = "";

  // Create a list item for each dog and append it to the list
  dogsArray.forEach((dog) => {
    dogList.innerHTML += `
    <li>
    <div>
    <p>${dog.name}</p>
    <p> ID: ${dog.dog_id}</p>
    </div>
    </li>`;
  });
}

// Add a button to the HTML that triggers the retrieval and display of all dogs
document.addEventListener("DOMContentLoaded", retrieveAndDisplayAllDogs);

document
  .getElementById("alphabetical")
  .addEventListener("click", alphabeticalOrder);

async function alphabeticalOrder() {
  const response = await fetch(`http://localhost:3000/dogs/atoz`);

  if (!response.ok) {
    alert("Oh no, no dog could be found try again");
    console.log("Oh no, no dog could be found try again");
    console.log(`Status: ${response.status}`);
    return;
  }
  const dogs = await response.json();
  const dogsArray = await dogs.data;

  const dogList = document.getElementById("dog-list");
  // Clear existing content in the dog list
  dogList.innerHTML = "";

  // Create a list item for each dog and append it to the list
  dogsArray.forEach((dog) => {
    dogList.innerHTML += `
    <li>
    <div>
    <p>${dog.name}</p>
    <p> ID: ${dog.dog_id}</p>
    </div>
    </li>`;
  });
}

document
  .getElementById("smallCheckbox")
  .addEventListener("change", () => handleCheckboxChange("smallCheckbox"));

document
  .getElementById("mediumCheckbox")
  .addEventListener("change", () => handleCheckboxChange("mediumCheckbox"));

document
  .getElementById("largeCheckbox")
  .addEventListener("change", () => handleCheckboxChange("largeCheckbox"));

async function getDogBySize(e) {
  const response = await fetch(
    `http://localhost:3000/dogs/size/${e.target.value}`
  );

  if (!response.ok) {
    alert("Oh no, no dog could be found try again");
    console.log("Oh no, no dog could be found try again");
    console.log(`Status: ${response.status}`);
    return;
  }
  const dogs = await response.json();
  const dogsArray = await dogs.data;

  console.log(dogsArray);

  const dogList = document.getElementById("dog-list");
  // Clear existing content in the dog list
  dogList.innerHTML = "";

  // Create a list item for each dog and append it to the list
  dogsArray.forEach((dog) => {
    dogList.innerHTML += `
    <li>
    <div>
    <p>${dog.name}</p>
    <p> ID: ${dog.dog_id}</p>
    </div>
    </li>`;
  });
}

function handleCheckboxChange(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  // Check if the checkbox is unchecked
  if (!checkbox.checked) {
    retrieveAndDisplayAllDogs();
  } else {
    getDogBySize(e);
  }
}