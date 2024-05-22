import { TotalBoothLocation } from "../models/locationschema.js";

const checkTimeStamp = async (timestamp, filter) => {
  const time = await TotalBoothLocation.findOne(filter);
  if (!time) return true;
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

  await TotalBoothLocation.bulkWrite(bulkOps);
  console.log("Bulk update completed");
};
