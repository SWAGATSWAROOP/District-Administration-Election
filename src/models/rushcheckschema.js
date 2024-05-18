import mongoose from "mongoose";

const rushSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    boothid: {
      type: String,
    },
    rush: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

export const RushCheck = new mongoose.model("RushCheck", rushSchema);
