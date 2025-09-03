import mongoose from "mongoose";
import dotenvx from "@dotenvx/dotenvx";
import { DB_NAME } from "../../constants.js";
dotenvx.config();
const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}${DB_NAME}`
    );
    console.log("Connection Host: ", connectionInstance.connection.host);
  } catch (err) {
    console.log(err.message || "DB connection fails");
    process.exit(1);
  }
};

export { ConnectDB };
