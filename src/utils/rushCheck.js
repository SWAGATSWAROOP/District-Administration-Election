import { fetchData } from "./fetchData.js";
import { bulkUpdate } from "./bulkinsertion.js";
import { RushCheck } from "../models/rushcheckschema.js";
let data = [];

export const fetchDataAndUpdate = async () => {
  try {
    data = await fetchData(process.env.RUSH_CHECK_URL);
    await bulkUpdate(data, RushCheck);
  } catch (error) {
    console.error("Error in inserting data:", error);
  }
};
