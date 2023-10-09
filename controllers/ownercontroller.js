import * as ownersModel from "../models/ownermodel.js";

export async function getOwners(req, res) {
  const owners = await ownersModel.getOwners();
  res.status(200).json({ status: "success", data: owners });
}

export async function getOwnerByID(req, res) {
  const queryURL = req.params.id;
  const specificOwner = await ownersModel.getOwnerByID(queryURL);

  if (!specificOwner) {
    return res
      .status(404)
      .json({
        status: "fail",
        data: specificOwner,
        msg: "No owner matched that ID",
      });
  } else {
    res.status(200).json({ status: "success", data: specificOwner });
  }
}

export async function getOwnersAlphabetical(req, res) {
  const dogs = await ownersModel.getOwnerssAlphabetical();
  console.log(req.params); // testing path is correct
  res.status(200).json({ status: "success", data: dogs });
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
      }
    });
  } else {
    res.status(200).json({ status: "success", data: listOfOwners });
  }
}

export async function deleteOwnerByID(req, res) {
  const queryURL = req.params.id;
  const specificOwner = await ownersModel.deleteOwnerByID(queryURL);

  if (!specificOwner) {
    return res
      .status(404)
      .json({
        status: "fail",
        data: specificOwner,
        msg: "No owner matched that ID, cannot be deleted",
      });
  } else {
    res.status(200).json({ status: "success", data: specificOwner, msg: "owner removed from database" });
  }
}