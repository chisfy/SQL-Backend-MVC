let searchBar;
let ownerObject;

async function getandretrieveOwnerData() {
searchBar = document.querySelector("#search-name").value;
if (!isNaN(searchBar)) {
    ownerObject = await retrieveOwnerDataByID();
    updatingElementsByID(ownerObject);
} else {
    ownerObject = await retrieveOwnerDataByName();
    updatingElements(ownerObject);
}}

async function retrieveOwnerDataByID() {
    // fetching the path
    const response = await fetch(`http://localhost:3000/owners/${searchBar}`);
    //need to parse the data
    const owner = await response.json();
    // parsed data
    const ownerArray = await owner.data;

    if (!response.ok) {
      alert("Oh no, no dog could be found try again");
      throw new Error('`Status: ${response.status}`');
    }

    console.log(ownerArray);
    return ownerArray;
  }

async function retrieveOwnerDataByName() {
  // fetching the path
  const response = await fetch(`http://localhost:3000/owners/firstname/${searchBar}`);
  //need to parse the data
  const owner = await response.json();
  // parsed data
  const ownerArray = await owner.data;

  if (!response.ok) {
    alert("Oh no, no owners could be found try again");
    console.log("Oh no, no owners could be found try again");
    console.log(`Status: ${response.status}`);
    return;
  }

  console.log(ownerArray);
  return ownerArray;
}

///now need to manipulate the data to show on the html page
let ownerID = document.querySelector(".owner-id");
let ownerFirstName = document.querySelector(".owner-first");
let ownerLastName = document.querySelector(".owner-last");
let ownerAddress = document.querySelector(".owner-address");
let ownerPhoneNo = document.querySelector(".owner-phoneno");

function updatingElementsByID(ownerObject) {
    ownerID.textContent = `ID: ${ownerObject["owner_id"]}`;
    ownerFirstName.textContent = `Name: ${ownerObject["first_name"]}`;
    ownerLastName.textContent = `Age: ${ownerObject["last_name"]}`;
    ownerAddress.textContent = `Address: ${ownerObject["address"]}`;
    ownerPhoneNo.textContent = `Phone Number: ${ownerObject["phone_number"]}`;
}

function updatingElements(ownerObject) {
    ownerID.textContent = `ID: ${ownerObject[0]["owner_id"]}`;
    ownerFirstName.textContent = `Name: ${ownerObject[0]["first_name"]}`;
    ownerLastName.textContent = `Age: ${ownerObject[0]["last_name"]}`;
    ownerAddress.textContent = `Address: ${ownerObject[0]["address"]}`;
    ownerPhoneNo.textContent = `Phone Number: ${ownerObject[0]["phone_number"]}`;
}


//submit button to trigger the loading of data
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", getandretrieveOwnerData);