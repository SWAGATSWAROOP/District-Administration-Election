export const bulkUpdate = async (data, model, rush = true) => {
  const bulkOps = data.map((element) => {
    const filter = { boothid: element.boothid };
    const update = {};
    if (rush) {
      filter.location = element.location;
      update.$set = { rush: element.rush };
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
