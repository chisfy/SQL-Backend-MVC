let form;

function openForm(formID) {
    form = document.querySelector(`#${formID}`);
    form.style.display = "block";
}

function closeForm(formID) {
    form = document.querySelector(`#${formID}`);
    form.style.display = "none";
}
