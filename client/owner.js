let searchBar;
let ownerObject;

async function getandretrieveOwnerData() {
  searchBar = document.querySelector("#search-name").value;
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";

  if (!isNaN(searchBar)) {
    matchingOwners = await retrieveOwnerDataByID();
  } else {
    matchingOwners = await retrieveOwnerDataByName();
  }

  if (matchingOwners.length === 0) {
    alert("No matching customers found, please try again");
  }

  const ownerCardsHTML = matchingOwners
    .map((owner) => createDogCardHTML(owner))
    .join("");
  searchResults.innerHTML = ownerCardsHTML;
}

function createDogCardHTML(owner) {

  return `
    <div class="owner-card">
    <h3 class="info">Owner:-</h3>
    <p class="owner-id">ID: ${owner.owner_id}</p>
    <p class="owner-name">Name: ${owner.first_name} ${owner.last_name}</p>
    <p class="owner-address">Address: ${owner.address}</p>
    <p class="owner-phoneno">Phone Number: ${owner.phone_number}</p>
    <button
      type="button"
      class="owner-form-edit"
      id="owner-form-edit"
      name="owner-form-edit"
      data-owner-id="${owner.owner_id}"
      onclick="openForm('edit-overlay')"
    >
      Update Details
    </button>
    <button
      type="button"
      class="owner-form-delete"
      id="owner-form-delete"
      name="owner-form-delete"
      data-owner-id="${owner.owner_id}"
      onclick="openForm('delete-overlay')"
    >
      Remove Owner
    </button>
    </div>
  `;
}


async function retrieveOwnerDataByID() {
  // fetching the path
  const response = await fetch(`http://localhost:3000/owners/${searchBar}`);
  //need to parse the data
  const owners = await response.json();
  // parsed data
  const ownersArray = await owners.data;

  if (!response.ok) {
    alert("No matching owners found, please try again");
    throw new Error(`Status: ${response.status}`);
  }

  console.log(ownersArray);
  return ownersArray;
}

async function retrieveOwnerDataByName() {
  // fetching the path
  const response = await fetch(`http://localhost:3000/owners/firstname/${searchBar}`);
  //need to parse the data
  const owners = await response.json();
  // parsed data
  const ownersArray = await owners.data;

  if (!response.ok) {
    alert("No matching owners found, please try again");
    throw new Error(`Status: ${response.status}`);
  }

  console.log(ownersArray);
  return ownersArray;
}

//submit button to trigger the loading of data
const submitButton = document.querySelector("#submit-search");

submitButton.addEventListener("click", getandretrieveOwnerData);

//testing if basic dom maaniuplation worked
function test() {
  console.log("Hello World");
}