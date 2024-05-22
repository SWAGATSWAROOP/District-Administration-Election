export const bulkUpdate = async (data, model, rush = true) => {
  const bulkOps = data.map((element) => {
    const filter = { boothid: element.boothid };
    const update = {};
    if (rush) {
      filter.location = element.location;
      const currenttime = new Date();
      const currentLinuxTimeStamp = Date.parse(currenttime);
      const givenLinuxTimeStamp = Date.parse(element.time);
      if (currentLinuxTimeStamp - givenLinuxTimeStamp <= 15000) {
        update.$set = { rush: element.rush, time: element.time };
      }
    } else {
      update.$set = { url: element.url };
    }
    return {
      updateOne: {
        filter: filter,
        update: update,
        upsert: true, // (insert if not present)
      },
    };
  });

  await model.bulkWrite(bulkOps);
  console.log("Bulk update completed");
};
