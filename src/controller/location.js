import addToRedis from "../db/redis/redisstore.js";
import { bulkUpdate } from "../utils/bulkinsertion.js";

export const location = async (req, res) => {
  try {
    const data = req.data;
    const model = req.model;
    const name = req.name;
    (async () => await addToRedis(name, data))();
    await bulkUpdate(data, model, false);
    return res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
