import { RushCheck } from "../models/rushcheckschema.js";

const checkTimeStamp = async (timestamp, filter) => {
  const time = await RushCheck.findOne(filter);
  if (!time) return true;
  console.log(time.timestamp);
  return timestamp > time.timestamp ? true : false;
};

export const bulkUpdate = async (data) => {
  const bulkOps = await Promise.all(
    data.map(async (element) => {
      const filter = { boothid: element.boothid, location: element.location };
      const update = {};

      if (await checkTimeStamp(element.timestamp, filter)) {
        update.$set = {
          rush: element.rush,
          time: element.time,
          timestamp: element.timestamp,
        };
      }
      return {
        updateOne: {
          filter: filter,
          update: update,
          upsert: true,
        },
      };
    })
  );

  await RushCheck.bulkWrite(bulkOps);
  console.log("Bulk update completed");
};
