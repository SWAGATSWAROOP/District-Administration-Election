import cluster from "node:cluster";
import http from "node:http";
import { availableParallelism } from "node:os";
import process from "node:process";
import { getPhillaur } from "./caches/locations/phillaurLocation.js";
import { getAdampur } from "./caches/locations/adampurLocation.js";
import { getjalandharCantt } from "./caches/locations/jalandharCanttLocation.js";
import { getjalandharCenter } from "./caches/locations/jalandharCenterLocation.js";
import { getjalandharNorth } from "./caches/locations/jalandharNorthLocation.js";
import { getjalandharWest } from "./caches/locations/jalandharWestLocation.js";
import { getNakodar } from "./caches/locations/nakodarLocation.js";
import { getShahkot } from "./caches/locations/shahkotLocation.js";
import { getKartarpur } from "./caches/locations/kartarpurLocation.js";
import { getRush } from "./caches/rushCheck.js";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const server = http.createServer((req, res) => {
    // Handling different routes/endpoints
    // Extracting the uniquekey from the URL
    const urlParts = req.url.split("/");
    // Extract the uniquekey from the URL
    const uniqueKey = decodeURIComponent(urlParts[urlParts.length - 1]);
    if (req.url.startsWith("/phillaur/")) {
      // Find the data based on the uniquekey
      const responseData = getPhillaur().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/adampur/")) {
      // Find the data based on the uniquekey
      const responseData = getAdampur().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/jalandharcantt/")) {
      // Find the data based on the uniquekey
      const responseData = getjalandharCantt().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/jalandharnorth/")) {
      // Find the data based on the uniquekey
      const responseData = getjalandharNorth().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/jalandharcenter/")) {
      // Find the data based on the uniquekey
      const responseData = getjalandharCenter().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/jalandharwest/")) {
      // Find the data based on the uniquekey
      const responseData = getjalandharWest().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/kartapur/")) {
      // Find the data based on the uniquekey
      const responseData = getKartarpur().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/shahkot/")) {
      // Find the data based on the uniquekey
      const responseData = getShahkot().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/nakodar/")) {
      // Find the data based on the uniquekey
      const responseData = getNakodar().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.url,
        })
      );
    } else if (req.url.startsWith("/rushcheck/")) {
      // Find the data based on the uniquekey
      const responseData = getRush().find(
        (element) => element.uniqueKey === uniqueKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: responseData.rush,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: "Not found",
        })
      );
    }
  });

  const PORT = process.env.PORT || 8000;

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  console.log(`Worker ${process.pid} started`);
}
