let searchBar;

async function getandretrieveDogData() {
searchBar = document.querySelector("#search-name").value;
const dogObject = await retrieveDogData();
updatingElements(dogObject);
}

async function retrieveDogData() {
  // fetching the path
  const response = await fetch(`http://localhost:3000/dogs/name/${searchBar}`);
  //need to parse the data
  const dogs = await response.json();
  // parsed data
  const dogsArray = await dogs.data;

  if (!response.ok) {
    alert("Oh no, no dog could be found try again");
    console.log("Oh no, no dog could be found try again");
    console.log(`Status: ${response.status}`);
    return;
  }

  console.log(dogsArray);
  return dogsArray;
}

///now need to manipulate the data to show on the html page
let dogName = document.querySelector(".dog-name");
let dogAge = document.querySelector(".dog-age");
let dogDob = document.querySelector(".dog-dob");
let dogSize = document.querySelector(".dog-size");
let dogBreed = document.querySelector(".dog-breed");
let dogOwner = document.querySelector(".dog-owner");

function updatingElements(dogObject) {
    dogName.textContent = `Name: ${dogObject[0]["name"]}`;
    dogAge.textContent = `Age: ${dogObject[0]["age"]}`;
    const dogdob = dogObject[0]["date_of_birth"];
    const dogBirthday = dogdob.substring(0, 10);
    dogDob.textContent = `Date of Birth: ${dogBirthday}`;
    dogSize.textContent = `Size: ${dogObject[0]["size"]}`;
    dogBreed.textContent = `Breed: ${dogObject[0]["breed"]}`;
    dogOwner.textContent = "Owner: Not Assigned";
}

//submit button to trigger the loading of data
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", getandretrieveDogData);

//testing if basic dom maaniuplation worked
function test() {
  console.log("Hello World");
}


const dogList = document.getElementById("dog-list");
// Function to retrieve and display a list of all dogs
async function retrieveAndDisplayAllDogs() {
// Fetch all dog data
const response = await fetch(`http://localhost:3000/dogs`);

if (!response.ok) {
    alert("Oh no, no dog could be found try again");
    console.log("Oh no, no dog could be found try again");
    console.log(`Status: ${response.status}`);
    return;
  }
  const dogs = await response.json();
  const dogsArray = await dogs.data;

  // Clear existing content in the dog list
  dogList.innerHTML = "";

  // Create a list item for each dog and append it to the list
  dogsArray.forEach(dog => {
    const listItem = document.createElement("li");
    listItem.textContent = `${dog.name}`;
    dogList.appendChild(listItem);
  });

}

// Add a button to the HTML that triggers the retrieval and display of all dogs
const getAllDogsButton = document.querySelector("#get-all-dogs");
getAllDogsButton.addEventListener("click", retrieveAndDisplayAllDogs);
getAllDogsButton.addEventListener("dblclick", () => {
dogList.innerHTML = "";
});