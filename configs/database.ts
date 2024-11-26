import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      authSource: "admin",
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    })
    .then(() => {
      console.log("Kết nối database thành công");
    })
    .catch((err) => {
      console.log(err);
      console.log("Kết nối database không thành công");
    });
};
