//form overlay display
function openForm(formID) {
  const form = document.getElementById(`${formID}`);
  if (form) {
    form.style.display = "block";
  }
}

function closeForm(formID) {
  const form = document.getElementById(`${formID}`);
  form.style.display = "none";
}

///new dog form
const form = document.getElementById("dog-form");
const resultDiv = document.getElementById("result");
const apiUrl = "http://localhost:4000/dogs";

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

//list updated when forms are closed
const overlayButton = document.getElementById("closebtn");
overlayButton.addEventListener("click", function () {
  retrieveAndDisplayAllDogs();
});

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
      const apiUrl = `http://localhost:4000/dogs/${deleteBar.value}`;

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