import { fetchData } from "../../utils/fetchData.js";

let data = [];

async function fetchDataAndUpdate() {
  try {
    data = await fetchData(process.env.KARTARPUR_LOCATION_URL);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setTimeout(fetchDataAndUpdate, 30000);

setInterval(fetchDataAndUpdate, 24 * 60 * 60 * 1000);

export const getKartarpur = () => data;
