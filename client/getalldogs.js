// Function to retrieve and display a list of all dogs
async function retrieveAndDisplayAllDogs() {
  // Fetch all dog data
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
    const listItem = document.createElement("li");
    listItem.textContent = `${dog.name}`;
    dogList.appendChild(listItem);
  });
}

// Add a button to the HTML that triggers the retrieval and display of all dogs
document.addEventListener("DOMContentLoaded", retrieveAndDisplayAllDogs);

