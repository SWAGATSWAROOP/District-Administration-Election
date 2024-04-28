import { fetchData } from "../../utils/fetchData.js"

let data = await fetchData(process.env.SHAHKOT_LOCATION_URL)

async function fetchDataAndUpdate() {
    try {
        data = await fetchData(process.env.SHAHKOT_LOCATION_URL)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

setInterval(fetchDataAndUpdate, 24 * 60 * 60 * 1000)

export const getShahkot = () => data
