import mongoose from "mongoose";

const propertyDetailSchema = new mongoose.Schema({
  area: {
    type: Number,
  },
  title: String,
  // beds: {
  //   type: Number,
  // },
  // bath: {
  //   type: Number,
  // },
  image: String,
  idProperty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
  }, // Liên kết đến tài liệu PropertiesDetail
});
//compiler
const PropertyDetailModel = mongoose.model(
  "propertyDetail",
  propertyDetailSchema
);

export default PropertyDetailModel;
