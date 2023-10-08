import * as dogsModel from "../models/dogmodel.js";

export async function getDogs(req, res) {
    const dogs = await dogsModel.getDogs();
    res.status(200).json({ status: "success", data: dogs });
}

export async function getDogsByID(req, res) {
    const queryURL = req.params.id;
    const specificDog = await dogsModel.getDogsByID(queryURL);
    res.status(200).json({ status: "success", data: specificDog });
}