import mongoose from "mongoose";

const boothSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    boothid: {
      type: String,
      index: true,
      unique: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Phillaur = new mongoose.model("Phillaur", boothSchema);
export const Nakodar = new mongoose.model("Nakodar", boothSchema);
export const Shahkot = new mongoose.model("Shahkot", boothSchema);
export const Kartarpur = new mongoose.model("Kartarpur", boothSchema);
export const JalandharWest = new mongoose.model("JalandharWest", boothSchema);
export const JalandharCenter = new mongoose.model(
  "JalandharCenter",
  boothSchema
);
export const JalandharNorth = new mongoose.model("JalandharNorth", boothSchema);
export const JalandharCantt = new mongoose.model("JalandharCantt", boothSchema);
export const Adampur = new mongoose.model("Adampur", boothSchema);
