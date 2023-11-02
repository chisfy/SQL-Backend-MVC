// Function to retrieve and display a list of all dogs
async function retrieveAndDisplayAllOwners() {
// Fetch all dog data
    const response = await fetch(`http://localhost:3000/owners/atoz`);

    if (!response.ok) {
        alert("Oh no, no owners could be found try again");
        console.log("Oh no, no owners could be found try again");
        console.log(`Status: ${response.status}`);
        return;
    }
    const owners = await response.json();
    const ownerArray = await owners.data;

  const ownerList = document.getElementById("owner-list");
  // Clear existing content in the dog list
  ownerList.innerHTML = "";

  // Create a list item for each dog and append it to the list
  ownerArray.forEach((owner) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${owner.first_name} ${owner.last_name}`;
    ownerList.appendChild(listItem);
  });
  }

  // Add a button to the HTML that triggers the retrieval and display of all dogs
  const getAllOwnersButton = document.querySelector("#getallowners");
  document.addEventListener("DOMContentLoaded", retrieveAndDisplayAllOwners);