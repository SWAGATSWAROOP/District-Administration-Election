import cluster from "node:cluster";
import express, { urlencoded } from "express";
import cors from "cors";
import { availableParallelism } from "node:os";
import process from "node:process";
import { fetchDataAndUpdate } from "./utils/rushCheck.js";
import rushRouter from "./routes/rush.js";
import ConnectToDB from "./db/mongodb/mongodb.js";
import { checkIfDBisEmpty } from "./utils/insertLocations.js";

export const app = express();
// const whitelist = [process.env.ORIGIN];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

ConnectToDB();
const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  checkIfDBisEmpty();
  setInterval(fetchDataAndUpdate, 60 * 1000);

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
