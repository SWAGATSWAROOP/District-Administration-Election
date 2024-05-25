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
    rush: {
      type: String,
      default: "0",
    },
    time: {
      type: String,
      default: "0",
    },
    partname: {
      type: String,
      default: "",
    },
    partnamepb: {
      type: String,
      default: "",
    },
    timestamp: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

export const TotalBoothLocation = new mongoose.model(
  "TotalBoothLocation",
  boothSchema
);
