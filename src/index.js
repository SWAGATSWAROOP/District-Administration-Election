import cluster from "node:cluster"
import http from "node:http"
import { availableParallelism } from "node:os"
import process from "node:process"
import { getPhillaur } from "./caches/locations/location.js"

const numCPUs = availableParallelism()

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const server = http.createServer((req, res) => {
        // Handling different routes/endpoints
        if (req.url.startsWith("/location/")) {
        // Extracting the uniquekey from the URL
        const urlParts = req.url.split('/');
        // Extract the uniquekey from the URL
        const uniqueKey = decodeURIComponent(urlParts[urlParts.length - 1]);
        // Find the data based on the uniquekey
        const responseData = getPhillaur().find(element => element.uniqueKey === uniqueKey);
            if (responseData) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ latitude: responseData.latitude, longitude: responseData.longitude }));
            } else {
                // If no data found for the given uniquekey, return 404
                res.writeHead(404, { "Content-Type": "application/json" });
                const errorData = { error: "Location not found" };
                res.end(JSON.stringify(errorData));
            }
        }else if (req.url === "/about") {
            res.writeHead(200, { "Content-Type": "application/json" })
            const aboutData = { message: "About Page" }
            res.end(JSON.stringify(aboutData))
        } else {
            res.writeHead(404, { "Content-Type": "application/json" })
            const errorData = { error: "404 Not Found" }
            res.end(JSON.stringify(errorData))
        }
    })

    const PORT = process.env.PORT || 8000

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

    console.log(`Worker ${process.pid} started`)
}
