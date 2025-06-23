import mongoose from "mongoose";
import dotenv from "dotenv"; //just for safety side we import dotenv
dotenv.config()

const db = () => {
    mongoose.connect(process.env.MONGO_URL)
  .then(() => {
   console.log("connected to MongoDB");
   
  })
  .catch((err) => {
    console.log("error connecting to MongoDB");
  })
}
export default db;