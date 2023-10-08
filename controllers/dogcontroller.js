import * as dogsModel from "../models/dogmodel.js";

export async function getDogs(req, res) {
  const dogs = await dogsModel.getDogs();
  res.status(200).json({ status: "success", data: dogs });
}

export async function getDogByID(req, res) {
  const queryURL = req.params.id;
  const specificDog = await dogsModel.getDogByID(queryURL);

  if (!specificDog) {
    return res
      .status(404)
      .json({
        status: "fail",
        data: specificDog,
        msg: "No dog matched that ID",
      });
  } else {
    res.status(200).json({ status: "success", data: specificDog });
  }
}
