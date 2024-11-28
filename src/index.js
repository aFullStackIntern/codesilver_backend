import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log("app is listening at port 8001");
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed!! ", err);
  });
