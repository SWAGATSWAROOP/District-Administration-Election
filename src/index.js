import cluster from "node:cluster";
import express, { urlencoded } from "express";
import { availableParallelism } from "node:os";
import process from "node:process";
import { fetchDataAndUpdate } from "./utils/rushCheck.js";
import locationRouter from "./routes/location.js";
import rushRouter from "./routes/rush.js";
import ConnectToDB from "./db/mongodb/mongodb.js";

ConnectToDB();
const numCPUs = availableParallelism();
export const app = express();
setInterval(fetchDataAndUpdate, 2 * 60 * 1000);

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
  const PORT = process.env.PORT || 8000;

  app.use(urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/rush", rushRouter);
  app.use("/location", locationRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
