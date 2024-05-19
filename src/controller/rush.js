import { redis } from "../db/redis/redis.js";
import { convertTime } from "../utils/conversionTime.js";

export const Rush = async (req, res) => {
  try {
    const boothid = req.params.id;
    const model = req.model;
    const name = req.name;
    const key = `${name}-${boothid}`;
    const exists = await redis.exists(key);
    if (exists) {
      const data = await redis.get(key);
      return res.status(200).json({ message: data });
    }
    const data = await model
      .find({
        location: `${name}`,
        boothid: boothid,
      })
      .select("-location -boothid");

    const givenTimestamp = new Date(data.time);
    const time = convertTime(givenTimestamp);
    // Calculate total minutes after adding 15 minutes
    const totalMinutes = givenTimestamp.getMinutes() + 15;
    // Check if totalMinutes exceeds 60
    if (totalMinutes >= 60) {
      const additionalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;

      // Adjust hours and minutes
      givenTimestamp.setHours(givenTimestamp.getHours() + additionalHours);
      givenTimestamp.setMinutes(remainingMinutes);
    }
    const currentTime = new Date();
    const ttl = currentTime - givenTimestamp;
    await redis.set(
      key,
      { message: { time: time, rush: data.rush } },
      "EX",
      ttl
    );
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
