async function getdogData() {

// fetching the path
const dogtable = await fetch("http://localhost:3000/dogs");
//need to parse the data
const dogs = await dogtable.json();
// parsed data
const dogsArray = await dogs.data;

console.log(dogsArray);

}

function test() {
    console.log("Hello World");
}

///now need to manipulate the data to show on the html page
const searchBar = document.querySelector("#search-name");

const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", test);