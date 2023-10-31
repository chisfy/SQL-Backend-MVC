// fetching the path
const dogtable = await fetch("http://localhost:3000/dogs");
//need to parse the data
const dogs = await dogtable.json();
// parsed data
const dogsArray = await dogs.data;

console.log(dogsArray);

