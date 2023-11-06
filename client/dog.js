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

//UPDATE FORM
// document.addEventListener("DOMContentLoaded", function () {

//   document.addEventListener("click", async function (event) {
//   if (event.target.classList.contains("dog-form-edit")) {
//     const dogId = event.target.getAttribute("data-dog-id");
//     openForm("edit-overlay");
//     console.log("testing");
//     const resultDiv = document.getElementById("edit-result");
//     const form = document.getElementById("dog-form-edit");
//     const apiUrl = `http://localhost:3000/dogs/${dogId}`;
//     form.addEventListener("submit", async function (event) {
//     event.preventDefault();
//     console.log("testing")
//       const formData = new FormData(event.target);
//       const searchdata = {};

//       formData.forEach((value, key) => {
//         searchdata[key] = value;
//       });

//       console.log(searchdata);

//       try {
//         const response = await fetch(apiUrl, {
//           method: 'PATCH',
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(searchdata),
//         });

//         if (response.ok) {
//           const data = await response.text();
//           resultDiv.textContent =
//             "Form submitted successfully. Response: " + data;
//           form.reset();
//         }
//       } catch (error) {
//         console.error("There was an error sending the form:", error);
//         resultDiv.textContent = "Form submission failed. Please try again.";
//       }
//     });
//   }
// });
// });

    // const overlayButton = document.getElementById("edit-closebtn");
    // overlayButton.addEventListener("click", function (event) {
    //   event.stopPropagation();
    //   console.log("Close button clicked");
    //   retrieveAndDisplayAllDogs();

//DELETE DOG
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("dog-form-delete")) {
    event.target.getAttribute("data-dog-id");
    openForm("delete-overlay");

    const deleteform = document.getElementById("delete-dog");
    const alertMessage = document.querySelector(".alert-message");
    const alertBox = document.querySelector(".alert");
    const deleteBar = document.querySelector(".delete-bar");
    const deleteResultDiv = document.getElementById("delete-result");

    deleteform.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = new FormData(deleteform);
      console.log(formData.get("dog_id"));
      const searchdata = new URLSearchParams(formData);
      console.log(searchdata);
      const apiUrl = `http://localhost:3000/dogs/${deleteBar.value}`;

      try {
        const response = await fetch(apiUrl, {
          method: "DELETE",
        });

        if (response.ok) {
          await response.text();
          alertBox.style.backgroundColor = "#008000";
          alertMessage.textContent = "Dog successfully deleted.";
        }
      } catch (error) {
        console.error("There was an error sending the form:", error);
        deleteResultDiv.textContent = "Deletion failed. Please try again.";
      }
    });

    document
      .getElementById("delete-closebtn")
      .addEventListener("click", function () {
        retrieveAndDisplayAllDogs();
      });
  }
});
