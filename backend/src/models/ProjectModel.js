import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  status: String,
  address: String,
  area: Number,
  building: Number,
  apartment: Number,
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//compiler
const ProjectModel = mongoose.model("project", projectSchema);

export default ProjectModel;
