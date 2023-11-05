
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

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("name"));
  console.log(formData.get("age"));
  console.log(formData.get("date_of_birth"));
  console.log(formData.get("size"));
  console.log(formData.get("breed"));
  const searchdata = new URLSearchParams(formData);
  console.log(searchdata);
  const apiUrl = "http://localhost:3000/dogs";

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

const updateButton = document.getElementById("dog-form-edit");
const formTitle = document.getElementById("form-title");
const formP = document.getElementById("form-p");

updateButton.addEventListener("click", () => {
  if (formTitle.textContent !== "Update Dog") {
    formTitle.textContent = "Update Dog";
    formP.textContent = "Use this form to update a dog in the daycare";
  }
});

const addButton = document.getElementById("dog-form-add");

addButton.addEventListener("click", () => {
  if (formTitle.textContent === "Update Dog") {
    formTitle.textContent = "New Dog";
    formP.textContent = "Use this form for a new dog joining the daycare";
  }
});

//delete dog form
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
    deleteResultDiv.textContent = "Form submission failed. Please try again.";
  }
});

document.getElementById("closebtn").addEventListener("click", function () {
  retrieveAndDisplayAllDogs();
});