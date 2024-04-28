export const fetchData = async (url) => {
    try {
        const responseData = await fetch(url)
        const newData = await responseData.json()
        return newData.data
    } catch (error) {
        console.log(`${error}, in fetching data `)
    }
}
