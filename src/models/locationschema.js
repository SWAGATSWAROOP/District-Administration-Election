import mongoose from "mongoose";

const boothSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    boothid: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

export const TotalBoothLocation = new mongoose.model(
  "TotalBoothLocation",
  boothSchema
);
