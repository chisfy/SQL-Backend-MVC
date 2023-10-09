import * as ownersModel from "../models/ownermodel.js";

export async function getOwners(req, res) {
  const owners = await ownersModel.getOwners();
  res.status(200).json({ status: "success", data: owners });
}

export async function getOwnerByID(req, res) {
  const queryURL = req.params.id;
  const specificOwner = await ownersModel.getOwnerByID(queryURL);

  if (!specificOwner) {
    return res.status(404).json({
      status: "fail",
      data: specificOwner,
      msg: "No owner matched that ID",
    });
  } else {
    res.status(200).json({ status: "success", data: specificOwner });
  }
}

export async function getOwnersAlphabetical(req, res) {
  const owners = await ownersModel.getOwnerssAlphabetical();
  console.log(req.params); // testing path is correct
  res.status(200).json({ status: "success", data: owners });
}

export async function getOwnersByName(req, res) {
  const queryURL = req.params.name; // testing path is correct
  console.log(req.params);
  const listOfOwners = await ownersModel.getOwnerssByName(queryURL);

  if (!listOfOwners.length) {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No owner matched that name",
      },
    });
  } else {
    res.status(200).json({ status: "success", data: listOfOwners });
  }
}

export async function deleteOwnerByID(req, res) {
  const queryURL = req.params.id;
  const specificOwner = await ownersModel.deleteOwnerByID(queryURL);

  if (!specificOwner) {
    return res.status(404).json({
      status: "fail",
      data: specificOwner,
      msg: "No owner matched that ID, cannot be deleted",
    });
  } else {
    res
      .status(200)
      .json({
        status: "success",
        data: specificOwner,
        msg: "owner removed from database",
      });
  }
}

export async function updateOwnerInformation(req, res) {
  const queryURL = req.params.id;
  const dataToFill = req.body;
  const specificOwner = await ownersModel.updateOwnerInformation(
    queryURL,
    dataToFill
  );

  if (!specificOwner) {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No owner matched that ID, cannot be updated",
      },
    });
  } else {
    res
      .status(200)
      .json({
        status: "success",
        data: specificOwner,
        msg: "owner updated in the database",
      });
  }
}

export async function addNewOwner(req, res) {
  const queryBody = req.body;
  const newOwnerAdded = await ownersModel.addNewOwner(queryBody);
  
  res
  .status(200)
  .json({
    status: "success",
    data: newOwnerAdded,
    msg: "owner added to the database",
  });
}

export async function getOwnersAlphabeticalSurname(req, res) {
  const owners = await ownersModel.getOwnerssAlphabeticalSurname();
  console.log(req.params); // testing path is correct
  res.status(200).json({ status: "success", data: owners });
}

export async function assignOwnerToDogs(req, res) {
  const { owner_id, dog_id } = req.query
  console.log(req.query);
  const assignID = await ownersModel.assignOwnerToDogs({owner_id,dog_id});

  if (!owner_id) {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No owner ID stated; needs both Owner ID and Dog iD to assign ownership",
      },
    });
  } else  if (!dog_id) {
    return res.status(404).json({
      status: "fail",
      data: {
        msg: "No dog ID stated; needs both Owner ID and Dog iD to assign ownership",
      },
    });
  } else {
  res
  .status(200)
  .json({
    status: "success",
    data: assignID,
    msg: "owner assigned to the dog",
  });
}
}