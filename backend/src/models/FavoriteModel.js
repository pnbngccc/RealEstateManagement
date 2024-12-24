import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  title: String,
  createAt: Date,
  updateAt: Date,
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  idProperty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
  },
});
//compiler
const FavoriteModel = mongoose.model("favorite", favoriteSchema);

export default FavoriteModel;
