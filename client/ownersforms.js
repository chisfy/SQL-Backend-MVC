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

//list updated when forms are closed
const overlayButton = document.getElementById("closebtn");
console.log(overlayButton);
overlayButton.addEventListener("click", function () {
  console.log("Close button clicked");
  retrieveAndDisplayAllDogs();
});
