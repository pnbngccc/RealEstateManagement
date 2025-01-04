import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  price: {
    type: Number,
  },
  title: String,
  description: String,
  property_type: String,
  beds: {
    type: Number,
  },
  bath: {
    type: Number,
  },
  area: {
    type: Number,
  },
  address: String,
  images: [{ type: String }], // Lưu trữ URL hình ảnh từ Cloudinary

  status: String,

  idUser: {
    type: mongoose.Schema.Types.ObjectId, //tham chiếu đến user
    ref: "User",
  },
  // details: [{ type: mongoose.Schema.Types.ObjectId, ref: "PropertyDetail" }], // chi tiết bđs tham chiếu đến bds
});
//compiler
const PropertyModel = mongoose.model("property", propertySchema);

export default PropertyModel;
