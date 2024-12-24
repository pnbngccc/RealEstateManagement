import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: String,
});
//compiler
const UserModel = mongoose.model("User", userSchema);
// //class UserModel (chứa condition "user" và theo hình dạng userSchema)
// new UserModel({
//   username: "bngoc",
//   password: "123",
//   role: "admin",
// });
export default UserModel;
