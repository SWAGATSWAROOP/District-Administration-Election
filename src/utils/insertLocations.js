import { TotalBoothLocation } from "../models/locationschema.js";

import { fetchData } from "./fetchData.js";

export async function checkIfDBisEmpty() {
  try {
    const DB = [
      process.env.SHAHKOT_LOCATION_URL,
      process.env.PHILLAUR_LOCATION_URL,
      process.env.ADAMPUR_LOCATION_URL,
      process.env.JALANDHAR_CANTT_LOCATION_URL,
      process.env.JALANDHAR_CENTER_LOCATION_URL,
      process.env.JALANDHAR_NORTH_LOCATION_URL,
      process.env.JALANDHAR_WEST_LOCATION_URL,
      process.env.NAKODAR_LOCATION_URL,
      process.env.KARTARPUR_LOCATION_URL,
    ];

    Promise.all(
      DB.map(async (url) => {
        const count = await TotalBoothLocation.countDocuments({});
        if (count === 0) {
          console.log("The collection is empty");
          const data = await fetchData(url);
          try {
            await TotalBoothLocation.insertMany(data);
          } catch (error) {
            console.log("Error in insertions ", error);
          }
        } else {
          console.log(`The collection contains ${count} documents.`);
        }
      })
    );
  } catch (error) {
    console.log("Error :- ", error);
  }
}
