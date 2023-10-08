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
