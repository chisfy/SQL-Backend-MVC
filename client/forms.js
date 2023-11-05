
//form overlay display
function openForm(formID) {
  const form = document.querySelector(`#${formID}`);
  form.style.display = "block";
}

function closeForm(formID) {
  const form = document.querySelector(`#${formID}`);
  form.style.display = "none";
}

///new dog form
const form = document.getElementById("dog-form");
const resultDiv = document.getElementById("result");
const apiUrl = "http://localhost:3000/dogs";

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const searchdata = new URLSearchParams(formData);
  console.log(searchdata);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchdata,
    });

    if (response.ok) {
      const data = await response.text();
      resultDiv.textContent = "Form submitted successfully. Response: " + data;
      form.reset();
    }
  } catch (error) {
    console.error("There was an error sending the form:", error);
    resultDiv.textContent = "Form submission failed. Please try again.";
  }
});

// //changing form content depending on button
// const updateButton = document.getElementsByClassName(".dog-form-edit");
// console.log(updateButton);

// updateButton.addEventListener("click", () => {
  //   if (formTitle.textContent !== "Update Dog") {
    //     formTitle.textContent = "Update Dog";
    //     formP.textContent = "Use this form to update a dog in the daycare";
    // }
    // });
    
    //changing form content back to default
const formTitle = document.getElementById("form-title");
const formP = document.getElementById("form-p");
const addButton = document.getElementById("dog-form-add");

addButton.addEventListener("click", () => {
  if (formTitle.textContent === "Update Dog") {
    formTitle.textContent = "New Dog";
    formP.textContent = "Use this form for a new dog joining the daycare";
  }
});

//list updated when forms are closed
const overlayButton = document.getElementById("closebtn");
console.log(overlayButton);
overlayButton.addEventListener("click", function () {
  console.log("Close button clicked");
  retrieveAndDisplayAllDogs();
});

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("closebtn").addEventListener("click", function () {
//     console.log("Close button clicked");
//     retrieveAndDisplayAllDogs();
//   });
// });

//delete dog form
// const deleteform = document.getElementById("delete-dog");
// const alertMessage = document.querySelector(".alert-message");
// const alertBox = document.querySelector(".alert");
// const deleteBar = document.querySelector(".delete-bar");
// const deleteResultDiv = document.getElementById("delete-result");

// deleteform.addEventListener("submit", async function (event) {
//   event.preventDefault();
//   const formData = new FormData(deleteform);
//   console.log(formData.get("dog_id"));
//   const searchdata = new URLSearchParams(formData);
//   console.log(searchdata);
//   const apiUrl = `http://localhost:3000/dogs/${deleteBar.value}`;

//   try {
//     const response = await fetch(apiUrl, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       await response.text();
//       alertBox.style.backgroundColor = "#008000";
//       alertMessage.textContent = "Dog successfully deleted.";
//     }
//   } catch (error) {
//     console.error("There was an error sending the form:", error);
//     deleteResultDiv.textContent = "Form submission failed. Please try again.";
//   }
// });