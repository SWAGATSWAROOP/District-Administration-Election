import { fetchData } from "../../utils/fetchData.js";

let data = [];

async function fetchDataAndUpdate() {
  try {
    data = await fetchData(process.env.SHAHKOT_LOCATION_URL);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setTimeout(fetchDataAndUpdate, 45000);

setInterval(fetchDataAndUpdate, 24 * 60 * 60 * 1000);

export const getShahkot = () => data;
