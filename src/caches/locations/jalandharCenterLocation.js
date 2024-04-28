import { fetchData } from "../../utils/fetchData.js"

let data = []

async function fetchDataAndUpdate() {
    try {
        data = await fetchData(process.env.JALANDHAR_CENTER_LOCATION_URL)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

setTimeout(fetchDataAndUpdate, 15000)

setInterval(fetchDataAndUpdate, 24 * 60 * 60 * 1000)

export const getjalandharCenter = () => data