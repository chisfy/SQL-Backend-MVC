//searchbar functionality
let searchBar;
let matchingDogs;

async function getandretrieveDogData() {
  searchBar = document.querySelector("#search-name").value;
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML="";

  if (!isNaN(searchBar)) {
    matchingDogs = await retrieveDogDataByID();
  } else {
    matchingDogs = await retrieveDogDataByName();
  }

  if(!matchingDogs) {
    alert("No matching dogs found, please try again");
  }

  const dogCardsHTML = matchingDogs.map((dog) => createDogCardHTML(dog)).join('');
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
    alert("Oh no, no dog could be found try again");
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
    alert("Oh no, no dog could be found try again");
    throw new Error(`Status: ${response.status}`);
  }

  console.log(dogsArray);
  return dogsArray;
}

///now need to manipulate the data to show on the html page
let dogID = document.querySelector(".dog-id");
let dogName = document.querySelector(".dog-name");
let dogAge = document.querySelector(".dog-age");
let dogDob = document.querySelector(".dog-dob");
let dogSize = document.querySelector(".dog-size");
let dogBreed = document.querySelector(".dog-breed");
let dogOwner = document.querySelector(".dog-owner");

function updatingElements(dogObject) {
  dogID.textContent = `ID: ${dogObject[0]["dog_id"]}`;
  dogName.textContent = `Name: ${dogObject[0]["name"]}`;
  dogAge.textContent = `Age: ${dogObject[0]["age"]}`;
  const dogdob = dogObject[0]["date_of_birth"];
  const dogBirthday = dogdob.substring(0, 10);
  dogDob.textContent = `Date of Birth: ${dogBirthday}`;
  dogSize.textContent = `Size: ${dogObject[0]["size"]}`;
  dogBreed.textContent = `Breed: ${dogObject[0]["breed"]}`;
  dogOwner.textContent = "Owner: Not Assigned";
}

function updatingElementsbyID(dogObject) {
  dogID.textContent = `ID: ${dogObject["dog_id"]}`;
  dogName.textContent = `Name: ${dogObject["name"]}`;
  dogAge.textContent = `Age: ${dogObject["age"]}`;
  const dogdob = dogObject["date_of_birth"];
  const dogBirthday = dogdob.substring(0, 10);
  dogDob.textContent = `Date of Birth: ${dogBirthday}`;
  dogSize.textContent = `Size: ${dogObject["size"]}`;
  dogBreed.textContent = `Breed: ${dogObject["breed"]}`;
  dogOwner.textContent = "Owner: Not Assigned";
}

//submit button to trigger the loading of data
const submitButton = document.querySelector("#submit-search");

submitButton.addEventListener("click", getandretrieveDogData);

//testing if basic dom maaniuplation worked
function test() {
  console.log("Hello World");
}