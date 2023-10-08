import * as dogsModel from "../models/dogmodel.js";

export async function getDogs(req, res) {
    const dogs = await dogsModel.getDogs();
    res.status(200).json({ status: "success", data: dogs });
}