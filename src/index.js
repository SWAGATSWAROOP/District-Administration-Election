import cluster from "node:cluster";
import express from "express";
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
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.get("/phillaur/:uniqueKey", (req, res) => {
    const responseData = getPhillaur()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/adampur/:uniqueKey", (req, res) => {
    const responseData = getAdampur()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/kartarpur/:uniqueKey", (req, res) => {
    const responseData = getKartarpur()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/shahkot/:uniqueKey", (req, res) => {
    const responseData = getShahkot()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/jalandharcantt/:uniqueKey", (req, res) => {
    const responseData = getjalandharCantt()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/jalandharnorth/:uniqueKey", (req, res) => {
    const responseData = getjalandharNorth()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/jalandharwest/:uniqueKey", (req, res) => {
    const responseData = getjalandharWest()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/jalandharcenter/:uniqueKey", (req, res) => {
    const responseData = getjalandharCenter()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/nakodar/:uniqueKey", (req, res) => {
    const responseData = getNakodar()[req.params.uniqueKey - 1];
    res.json({ data: responseData.url });
  });

  app.get("/rush/:uniqueKey", (req, res) => {
    const responseData = getRush().find(
      (element) => element.uniqueKey === uniqueKey
    );
    res.json({ data: responseData.url });
  });

  app.get("*", (req, res) => {
    res.status(404).json({ data: "Not found" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
