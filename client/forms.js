

function openForm(formID) {
    const form = document.querySelector(`#${formID}`);
    form.style.display = "block";
}

function closeForm(formID) {
    const form = document.querySelector(`#${formID}`);
    form.style.display = "none";
}

const form = document.getElementById("new-dog-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData.get("name"));
    console.log(formData.get("age"));
    console.log(formData.get("date_of_birth"));
    console.log(formData.get("size"));
    console.log(formData.get("breed"));
    const searchdata = new URLSearchParams(formData);
    console.log(searchdata)
    const apiUrl = "http://localhost:3000/dogs";

    try {
        const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: searchdata
    });

    if (response.ok) {
        const data = await response.text();
        resultDiv.textContent = 'Form submitted successfully. Response: ' + data;
        form.reset();
    }

} catch (error) {
    console.error("There was an error sending the form:", error);
    resultDiv.textContent = 'Form submission failed. Please try again.';
}
});