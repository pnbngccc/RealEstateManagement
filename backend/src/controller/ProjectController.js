// import ProjectModel from "../models/ProjectModel.js";
// import mongoose from "mongoose";
// const getListProjects = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const properties = await ProjectModel.find()
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate("idUser"); // Lấy chi tiết liên kết
//     const total = await ProjectModel.countDocuments();

//     res.status(200).json({
//       success: true,
//       data: properties,
//       meta: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch projects." });
//   }
// };
// const getListProject = async (req, res) => {
//   try {
//     const projectId = req.params.id;
//     const project = await ProjectModel.findById(projectId).populate("idUser");
//     if (!project) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found." });
//     }
//     res.status(200).json({ success: true, data: property });
//   } catch (error) {
//     console.error("Error fetching project by ID:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch project." });
//   }
// };
// const addProject = async (req, res) => {
//   const { title, description, status, area, building, apartment, address } =
//     req.body;

//   if (!description || !title || !status || !address || area === undefined) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing required fields." });
//   }
//   // Lấy userId từ thông tin người dùng đã xác thực
//   const userId = req.user.id; // Hoặc cách nào đó để lấy userId
//   try {
//     const newProject = new ProjectModel({
//       ...req.body,
//       idUser: userId, // Liên kết với người dùng hiện tại
//     });
//     const savedProject = await newProject.save();
//     res.status(201).json({ success: true, data: savedProject });
//   } catch (error) {
//     console.error("Error adding project:", error);
//     res.status(500).json({ success: false, message: "Failed to add project." });
//   }
// };
// const updateProject = async (req, res) => {
//   const projectId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(projectId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Project ID" });
//   }

//   try {
//     const updatedProject = await ProjectModel.findByIdAndUpdate(
//       projectId,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedProject) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found" });
//     }

//     res.status(200).json({ success: true, data: updatedProject });
//   } catch (error) {
//     console.error("Error updating project:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update project",
//       error: error.message,
//     });
//   }
// };

// const deleteProject = async (req, res) => {
//   const projectId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(projectId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Project ID" });
//   }

//   try {
//     const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

//     if (!deletedProject) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Project deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting project:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete project",
//       error: error.message,
//     });
//   }
// };

// export default {
//   getListProjects,
//   addProject,
//   getListProject,
//   updateProject,
//   deleteProject,
// };
import ProjectModel from "../models/ProjectModel.js";
import mongoose from "mongoose";

const getListProjects = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const projects = await ProjectModel.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("idUser"); // Lấy chi tiết liên kết
    const total = await ProjectModel.countDocuments();

    res.status(200).json({
      success: true,
      data: projects,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch projects." });
  }
};

const getListProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectModel.findById(projectId).populate("idUser");
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch project." });
  }
};

const addProject = async (req, res) => {
  const { title, description, status, area, building, apartment, address } =
    req.body;

  if (!description || !title || !status || !address || area === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  // Lấy userId từ thông tin người dùng đã xác thực
  const userId = req.user.id; // Đảm bảo rằng req.user đã được thiết lập trước đó bởi một middleware

  try {
    const newProject = new ProjectModel({
      ...req.body,
      idUser: userId, // Liên kết với người dùng hiện tại
    });
    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ success: false, message: "Failed to add project." });
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Project ID" });
  }

  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Project ID" });
  }

  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

export default {
  getListProjects,
  addProject,
  getListProject,
  updateProject,
  deleteProject,
};
