import { redis } from "../db/redis/redis.js";
import { TotalBoothLocation } from "../models/locationschema.js";

const AllRush = async (_, res) => {
  try {
    const exists = await redis.exists("allrush");
    if (exists) {
      const data = await redis.get("allrush");
      const jsonData = JSON.parse(data);
      return res.status(200).json(jsonData);
    }

    const data = await TotalBoothLocation.find().select(
      "-_id, -createdAt -updatedAt -__v"
    );

    const jsonData = JSON.stringify(data);
    await redis.set("allrush", jsonData, "EX", 300);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default AllRush;
