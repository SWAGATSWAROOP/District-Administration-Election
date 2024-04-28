import { fetchData } from "../utils/fetchData.js"

let data = await fetchData(process.env.RUSH_CHECK_URL)

async function fetchDataAndUpdate() {
    try {
        data = await fetchData(process.env.RUSH_CHECK_URL)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

setInterval(fetchDataAndUpdate, 5 * 60 * 1000)

export const getRush = () => data
