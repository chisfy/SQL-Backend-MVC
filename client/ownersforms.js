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

///new owner form
const form = document.getElementById("owner-form");
const resultDiv = document.getElementById("result");
const apiUrl = "http://localhost:3000/owners";

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
console.log(overlayButton);
overlayButton.addEventListener("click", function () {
  console.log("Close button clicked");
  retrieveAndDisplayAllDogs();
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("owner-form-delete")) {
    event.target.getAttribute("data-owner-id");
    openForm("delete-overlay");

    const deleteform = document.getElementById("delete-owner");
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
      const apiUrl = `http://localhost:3000/owners/${deleteBar.value}`;

      try {
        const response = await fetch(apiUrl, {
          method: "DELETE",
        });

        if (response.ok) {
          await response.text();
          alertBox.style.backgroundColor = "#008000";
          alertMessage.textContent = "Customer successfully deleted.";
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