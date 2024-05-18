import { redis } from "./redis";

const receiveDataLocation = async (constitiencyName, boothId) => {
  const data = await redis.hget(constitiencyName, boothId);
  return data;
};

export default receiveDataLocation;
