//searchbar functionality
let searchBar;
let matchingDogs;

async function getandretrieveDogData() {
  searchBar = document.querySelector("#search-name").value;
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";

  if (!isNaN(searchBar)) {
    matchingDogs = await retrieveDogDataByID();
  } else {
    matchingDogs = await retrieveDogDataByName();
  }

  if (matchingDogs.length === 0) {
    alert("No matching dogs found, please try again");
  }

  const dogCardsHTML = matchingDogs
    .map((dog) => createDogCardHTML(dog))
    .join("");
  searchResults.innerHTML = dogCardsHTML;
}

function createDogCardHTML(dog) {
  const formattedDate = birthdayOfDog(dog.date_of_birth);

  return `
    <div class="dog-card">
    <h3 class="info">Dog:-</h3>
    <p class="dog-id">ID: ${dog.dog_id}</p>
    <p class="dog-name">Name: ${dog.name}</p>
    <p class="dog-age">Age:${dog.age}</p>
    <p class="dog-dob">Date of Birth: ${formattedDate}</p>
    <p class="dog-size">Size: ${dog.size}</p>
    <p class="dog-breed">Breed: ${dog.breed}</p>
    <p class="dog-owner">Owner: ${dog.owner_id}</p>
    <button
      type="button"
      class="dog-form-edit"
      id="dog-form-edit"
      name="dog-form-edit"
      data-dog-id="${dog.dog_id}"
      onclick="openForm('edit-overlay')"
    >
      Update Details
    </button>
    <button
      type="button"
      class="dog-form-delete"
      id="dog-form-delete"
      name="dog-form-delete"
      data-dog-id="${dog.dog_id}"
      onclick="openForm('delete-overlay')"
    >
      Delete Dog
    </button>
    </div>
  `;
}

function birthdayOfDog(dateofbirth) {
  const date = new Date(dateofbirth);
  return date.toLocaleDateString();
}

async function retrieveDogDataByID() {
  // fetching the path
  const response = await fetch(`http://localhost:3000/dogs/${searchBar}`);
  //need to parse the data
  const dogs = await response.json();
  // parsed data
  const dogsArray = await dogs.data;

  if (!response.ok) {
    alert("No matching dogs found, please try again");
    throw new Error(`Status: ${response.status}`);
  }

  console.log(dogsArray);
  return dogsArray;
}

async function retrieveDogDataByName() {
  // fetching the path
  const response = await fetch(`http://localhost:3000/dogs/name/${searchBar}`);
  //need to parse the data
  const dogs = await response.json();
  // parsed data
  const dogsArray = await dogs.data;

  if (!response.ok) {
    alert("No matching dogs found, please try again");
    throw new Error(`Status: ${response.status}`);
  }

  console.log(dogsArray);
  return dogsArray;
}

//submit button to trigger the loading of data
const submitButton = document.querySelector("#submit-search");

submitButton.addEventListener("click", getandretrieveDogData);

//testing if basic dom maaniuplation worked
function test() {
  console.log("Hello World");
}




