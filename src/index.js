import cluster from "node:cluster";
import express, { urlencoded } from "express";
import { availableParallelism } from "node:os";
import process from "node:process";
import { fetchDataAndUpdate } from "./utils/rushCheck.js";
import rushRouter from "./routes/rush.js";
import ConnectToDB from "./db/mongodb/mongodb.js";
import { checkIfDBisEmpty } from "./utils/insertLocations.js";

ConnectToDB();
const numCPUs = availableParallelism();
export const app = express();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  checkIfDBisEmpty();
  setInterval(fetchDataAndUpdate, 5*1000);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const PORT = process.env.PORT || 8000;

  app.use(urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/rush", rushRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
