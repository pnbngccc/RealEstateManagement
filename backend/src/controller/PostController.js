import PostModel from "../models/PostModel.js";
import mongoose from "mongoose";

const getListPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const projects = await PostModel.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("idUser"); // Lấy chi tiết liên kết
    const total = await PostModel.countDocuments();

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
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch posts." });
  }
};

const getListPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate("idUser");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch post." });
  }
};

const addPost = async (req, res) => {
  const {
    price,
    title,
    description,
    property_type,
    status,
    area,
    beds,
    bath,
    address,
    images,
  } = req.body;

  if (
    !description ||
    !title ||
    !property_type ||
    !status ||
    !address ||
    area === undefined ||
    beds === undefined ||
    bath === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  // Lấy userId từ thông tin người dùng đã xác thực
  const userId = req.user.id; // Đảm bảo rằng req.user đã được thiết lập trước đó bởi một middleware

  try {
    const newProject = new PostModel({
      price, // Nếu có giá, có thể thêm vào
      title,
      description,
      property_type,
      status,
      area,
      beds,
      bath,
      address,
      images,
      idUser: userId, // Liên kết với người dùng hiện tại
    });
    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ success: false, message: "Failed to add post." });
  }
};

const updatePost = async (req, res) => {
  const projectId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Project ID" });
  }

  try {
    const updatedProject = await PostModel.findByIdAndUpdate(
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

const deletePost = async (req, res) => {
  const projectId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Project ID" });
  }

  try {
    const deletedProject = await PostModel.findByIdAndDelete(projectId);

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
  getListPosts,
  addPost,
  getListPost,
  updatePost,
  deletePost,
};
