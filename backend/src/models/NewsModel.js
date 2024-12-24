import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  published_date: {
    type: Date,
  },
  image: String,
  status: String,
  idAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // Liên kết đến tài liệu PropertiesDetail
});
//compiler
const NewsModel = mongoose.model("News", newsSchema);

export default NewsModel;
