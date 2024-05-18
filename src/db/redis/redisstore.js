import { redis } from "./redis.js";

const pipeline = redis.pipeline();

async function addToRedis(constitiencyName, array) {
  array.forEach((element) => {
    pipeline.hset(constitiencyName, element.boothid, element.url);
  });

  await pipeline.exec();
}

export default addToRedis;
