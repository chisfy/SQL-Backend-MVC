import * as dogsModel from "../models/dogmodel.js";

export async function getDogs(req, res) {
  const dogs = await dogsModel.getDogs();
  console.log(req.params);
  res.status(200).json({ status: "success", data: dogs });
}

export async function getDogByID(req, res) {
  const queryURL = req.params.id;
  console.log(req.params);
  const specificDog = await dogsModel.getDogByID(queryURL);

  if (!specificDog) {
    return res.status(404).json({
      status: "fail",
      data: specificDog,
      msg: "No dog matched that ID",
    });
  } else {
    res.status(200).json({ status: "success", data: specificDog });
  }
}

export async function getDogsAlphabetical(req, res) {
  const dogs = await dogsModel.getDogsAlphabetical();
  console.log(req.params);
  res.status(200).json({ status: "success", data: dogs });
}

export async function getDogsByName(req, res) {
  const queryURL = req.params.name;
  console.log(req.params);
  const listOfDogs = await dogsModel.getDogsByName(queryURL);

  if (!listOfDogs.length) {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No dog matched that name",
      },
    });
  } else {
    res.status(200).json({ status: "success", data: listOfDogs });
  }
}

export async function deleteDogByID(req, res) {
  const queryURL = req.params.id;
  console.log(req.params);
  const specificDog = await dogsModel.deleteDogByID(queryURL);

  if (!specificDog) {
    return res.status(404).json({
      status: "fail",
      data: specificDog,
      msg: "No dog matched that ID, cannot be deleted",
    });
  } else {
    res
      .status(200)
      .json({
        status: "success",
        data: specificDog,
        msg: "dog removed from database",
      });
  }
}

export async function updateDogInformation(req, res) {
  const queryURL = req.params.id;
  const dataToFill = req.body;
  const specificDog = await dogsModel.updateDogInformation(
    queryURL,
    dataToFill
  );

  if (!specificDog) {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No dog matched that ID, cannot be updated",
      },
    });
  } else {
    res
      .status(200)
      .json({
        status: "success",
        data: specificDog,
        msg: "dog updated in the database",
      });
  }
}

export async function addNewDog(req, res) {
  const queryBody = req.body;
  const newDogAdded = await dogsModel.addNewDog(queryBody);
  
  res
  .status(200)
  .json({
    status: "success",
    data: newDogAdded,
    msg: "dog added to the database",
  });
}

export async function getDogsBSize(req, res) {
  const queryURL = req.params.size;
  console.log(req.params);
  const listOfDogs = await dogsModel.getDogsBySize(queryURL);

  if (queryURL != 'Small' && queryURL != 'Medium' && queryURL != 'Large') {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No dog matched that size; choose from Small, Medium or Large",
      }
    });
  } else {
    res.status(200).json({ status: "success", data: listOfDogs });
  }
}