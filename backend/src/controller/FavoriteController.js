// import FavoriteModel from "../models/FavoriteModel.js";
// import mongoose from "mongoose";

// // Lấy danh sách yêu thích
// const getFavoriteList = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const favorites = await FavoriteModel.find()
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate("idProperty") // Lấy chi tiết tài sản liên kết
//       .populate("idUser"); // Lấy chi tiết người dùng liên kết
//     const total = await FavoriteModel.countDocuments();

//     res.status(200).json({
//       success: true,
//       data: favorites,
//       meta: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching favorites:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch favorites." });
//   }
// };

// // Lấy một mục yêu thích
// const getFavorite = async (req, res) => {
//   try {
//     const favoriteId = req.params.id;
//     const favorite = await FavoriteModel.findById(favoriteId)
//       .populate("idProperty")
//       .populate("idUser");
//     console.log("Request body:", req.body);

//     if (!favorite) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Favorite not found." });
//     }

//     res.status(200).json({ success: true, data: favorite });
//   } catch (error) {
//     console.error("Error fetching favorite by ID:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch favorite." });
//   }
// };

// // Thêm vào danh sách yêu thích
// const addFavorite = async (req, res) => {
//   const { idProperty } = req.body;

//   if (!idProperty) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing required fields." });
//   }

//   const userId = req.user.id; // Lấy userId từ thông tin người dùng đã xác thực

//   try {
//     const newFavorite = new FavoriteModel({
//       idUser: userId,
//       idProperty,
//     });
//     const savedFavorite = await newFavorite.save();
//     res.status(201).json({ success: true, data: savedFavorite });
//   } catch (error) {
//     console.error("Error adding favorite:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to add favorite." });
//   }
// };

// // Cập nhật mục yêu thích
// const updateFavorite = async (req, res) => {
//   const favoriteId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Favorite ID" });
//   }

//   try {
//     const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
//       favoriteId,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedFavorite) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Favorite not found" });
//     }

//     res.status(200).json({ success: true, data: updatedFavorite });
//   } catch (error) {
//     console.error("Error updating favorite:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update favorite",
//       error: error.message,
//     });
//   }
// };

// // Xóa mục yêu thích
// const deleteFavorite = async (req, res) => {
//   const favoriteId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Favorite ID" });
//   }

//   try {
//     const deletedFavorite = await FavoriteModel.findByIdAndDelete(favoriteId);

//     if (!deletedFavorite) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Favorite not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Favorite deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting favorite:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete favorite",
//       error: error.message,
//     });
//   }
// };

// export default {
//   getFavoriteList,
//   addFavorite,
//   getFavorite,
//   updateFavorite,
//   deleteFavorite,
// };
import FavoriteModel from "../models/FavoriteModel.js";
import mongoose from "mongoose";

// Lấy danh sách yêu thích
const getFavoriteList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const favorites = await FavoriteModel.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("idProperty") // Lấy chi tiết tài sản liên kết
      .populate("idUser"); // Lấy chi tiết người dùng liên kết
    const total = await FavoriteModel.countDocuments();

    res.status(200).json({
      success: true,
      data: favorites,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favorites." });
  }
};

// Lấy một mục yêu thích
const getFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const favorite = await FavoriteModel.findById(favoriteId)
      .populate("idProperty")
      .populate("idUser");

    if (!favorite) {
      return res
        .status(404)
        .json({ success: false, message: "Favorite not found." });
    }

    res.status(200).json({ success: true, data: favorite });
  } catch (error) {
    console.error("Error fetching favorite by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favorite." });
  }
};

// Thêm vào danh sách yêu thích
const addFavorite = async (req, res) => {
  const { idProperty } = req.body;

  if (!idProperty) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  const userId = req.user.id; // Lấy userId từ thông tin người dùng đã xác thực

  try {
    const newFavorite = new FavoriteModel({
      idUser: userId,
      idProperty,
    });
    const savedFavorite = await newFavorite.save();
    res.status(201).json({ success: true, data: savedFavorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add favorite." });
  }
};

// Cập nhật mục yêu thích
const updateFavorite = async (req, res) => {
  const favoriteId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Favorite ID" });
  }

  try {
    const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
      favoriteId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFavorite) {
      return res
        .status(404)
        .json({ success: false, message: "Favorite not found" });
    }

    res.status(200).json({ success: true, data: updatedFavorite });
  } catch (error) {
    console.error("Error updating favorite:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update favorite",
      error: error.message,
    });
  }
};

// Xóa mục yêu thích
const deleteFavorite = async (req, res) => {
  const favoriteId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Favorite ID" });
  }

  try {
    const deletedFavorite = await FavoriteModel.findByIdAndDelete(favoriteId);

    if (!deletedFavorite) {
      return res
        .status(404)
        .json({ success: false, message: "Favorite not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Favorite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete favorite",
      error: error.message,
    });
  }
};

export default {
  getFavoriteList,
  addFavorite,
  getFavorite,
  updateFavorite,
  deleteFavorite,
};
