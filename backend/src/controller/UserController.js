import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

const getListUser = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await UserModel.find() // Lấy danh sách người dùng
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await UserModel.countDocuments();
    return res.status(200).json({
      success: true,
      data: users,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    }); // Trả về danh sách người dùng
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return res.status(500).json("Failed to get users"); // Lỗi máy chủ
  }
};

const getUser = async (req, res) => {
  try {
    console.log("Fetching user with ID:", req.params.id); // Log ID
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { _id, username, role, phone } = user;
    return res.status(200).json({ _id, username, role, phone });
  } catch (error) {
    console.error("Error fetching user:", error); // Log lỗi
    return res.status(500).json({ message: "Failed to get user" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Lấy `userId` từ middleware (token)
  const { password, avatar, ...otherInputs } = req.body; // Tách các trường từ body

  if (!id || !userId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    const updateData = { ...otherInputs }; // Khởi tạo dữ liệu cần cập nhật

    // Kiểm tra nếu có mật khẩu, hash trước khi cập nhật
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash mật khẩu
      updateData.password = hashedPassword;
    }

    if (avatar) {
      // Kiểm tra xem avatar có phải là một URL hợp lệ không (tùy chọn)
      const isValidAvatar = validateAvatarUrl(avatar);
      if (isValidAvatar) {
        updateData.avatar = avatar;
      } else {
        return res.status(400).json({ message: "Invalid avatar URL" });
      }
    }

    // Tiến hành cập nhật user
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true, // Trả về bản ghi sau khi cập nhật
      runValidators: true, // Đảm bảo kiểm tra validation của model
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};
// Hàm kiểm tra URL hợp lệ cho avatar (tùy chọn)
const validateAvatarUrl = (url) => {
  const regex = /(http|https):\/\/[^\s$.?#].[^\s]*/; // Regex đơn giản để kiểm tra URL
  return regex.test(url);
};
const deleteUser = async (req, res) => {
  const id = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Property ID" });
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
  res.json("Profile");
};

export default { getListUser, profile, getUser, updateUser, deleteUser };
