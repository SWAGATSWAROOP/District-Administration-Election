import { fetchData } from "./fetchData.js";
import { bulkUpdate } from "./bulkupdate.js";

export const fetchDataAndUpdate = async () => {
  try {
    const data = await fetchData(process.env.RUSH_CHECK_URL);
    await bulkUpdate(data);
  } catch (error) {
    console.error("Error in inserting data:", error);
  }
};
