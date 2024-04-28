let data = []

const fetchData = async () => {
    try {
        const res = await fetch(
            "https://script.googleusercontent.com/a/macros/nitj.ac.in/echo?user_content_key=-3-nKeqbNoANzMhBQkKbJg3CG_pf212vQOpE-aHc8-vRCRCgtStTK2G3RQ0GkPkpV7ZxMl6dHMbCh8bAhXA8TykRutU8zNFHm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_nRPgeZU6HP-_0BNofnPdfyHaYKxUla6ApwUnv8K4sT2oD9kNLSL4fZ4xIs7HgPUlHY7jKpNCFgCSi17GZnbX1yH4PAElOYJwa73chnJ_wxEHCgCF8NBU2icuENTxjnnG8p9WeGMjpS4&lib=MetkyaMxkl5-UmByL8rFmnDrZP_ZtZbTu"
        )
        const newData = await res.json()
        data = newData.data
    } catch (error) {
        console.log("error in fetching the data" + error)
    }
}

// rehydrating in every 1 day
const rehydrateCache = async () => {
    await fetchData()
    setInterval(fetchData, 24 * 60 * 60 * 1000)
}

rehydrateCache()

export const getPhillaur = () => data
