import mongoose from "mongoose";

async function ConnectToDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log("Error in connection to DB");
  }
}

export default ConnectToDB;
