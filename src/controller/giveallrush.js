import { redis } from "../db/redis/redis.js";
import { RushCheck } from "../models/rushcheckschema.js";
import { TotalBoothLocation } from "../models/locationschema.js";

const AllRush = async (_, res) => {
  try {
    const exists = await redis.exists("allrush");
    if (exists) {
      const data = await redis.get("allrush");
      const location = await redis.get("alllocation");
      const jsonData2 = JSON.parse(location);
      const jsonData = JSON.parse(data);
      return res
        .status(200)
        .json({ message: { rush: jsonData, location: jsonData2 } });
    }

    const location = await TotalBoothLocation.find().select(
      "-_id, -createdAt -updatedAt -__v"
    );
    const data = await RushCheck.find().select(
      "-_id -createdAt -updatedAt -__v"
    );
    const jsonData = JSON.stringify(data);
    const jsonData2 = JSON.stringify(location);
    await redis.set("allrush", jsonData, "EX", 20);
    await redis.set("alllocation", jsonData2, "EX", 20);
    return res
      .status(200)
      .json({ message: { rush: data, location: location } });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default AllRush;
