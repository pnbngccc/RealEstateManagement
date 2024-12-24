// import NewsModel from "../models/NewsModel.js";
// import mongoose from "mongoose";
// const getListNews = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const news = await NewsModel.find()
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate("idAuthor"); // Lấy chi tiết liên kết
//     const total = await NewsModel.countDocuments();

//     res.status(200).json({
//       success: true,
//       data: news,
//       meta: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch properties." });
//   }
// };
// const getNews = async (req, res) => {
//   try {
//     const NewsId = req.params.id;
//     const News = await NewsModel.findById(NewsId).populate("idAuthor");
//     if (!News) {
//       return res
//         .status(404)
//         .json({ success: false, message: "News not found." });
//     }
//     res.status(200).json({ success: true, data: News });
//   } catch (error) {
//     console.error("Error fetching News by ID:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch News." });
//   }
// };
// const addNews = async (req, res) => {
//   const { title, description, published_date, status } = req.body;

//   if (
//     !description ||
//     !title ||
//     !status ||
//     !published_date
//     // beds === undefined ||
//     // bath === undefined
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing required fields." });
//   }
//   const userId = req.user.id; // Hoặc cách nào đó để lấy userId

//   try {
//     const newNews = new NewsModel({
//       ...req.body,
//       idAuthor: userId, // Liên kết với người dùng hiện tại
//     });
//     const savedNews = await newNews.save();
//     res.status(201).json({ success: true, data: savedNews });
//   } catch (error) {
//     console.error("Error adding news:", error);
//     res.status(500).json({ success: false, message: "Failed to add news." });
//   }
// };
// const updateNews = async (req, res) => {
//   const NewsId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(NewsId)) {
//     return res.status(400).json({ success: false, message: "Invalid News ID" });
//   }

//   try {
//     const updatedNews = await NewsModel.findByIdAndUpdate(NewsId, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedNews) {
//       return res
//         .status(404)
//         .json({ success: false, message: "News not found" });
//     }

//     res.status(200).json({ success: true, data: updatedNews });
//   } catch (error) {
//     console.error("Error updating News:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update News",
//       error: error.message,
//     });
//   }
// };

// const deleteNews = async (req, res) => {
//   const NewsId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(NewsId)) {
//     return res.status(400).json({ success: false, message: "Invalid News ID" });
//   }

//   try {
//     const deletedNews = await NewsModel.findByIdAndDelete(NewsId);

//     if (!deletedNews) {
//       return res
//         .status(404)
//         .json({ success: false, message: "News not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "News deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting news:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete news",
//       error: error.message,
//     });
//   }
// };

// export default {
//   getListNews,
//   addNews,
//   getNews,
//   updateNews,
//   deleteNews,
// };
import NewsModel from "../models/NewsModel.js";
import mongoose from "mongoose";

const getListNews = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const news = await NewsModel.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("idAuthor"); // Lấy chi tiết liên kết
    const total = await NewsModel.countDocuments();

    res.status(200).json({
      success: true,
      data: news,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, message: "Failed to fetch news." });
  }
};

const getNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await NewsModel.findById(newsId).populate("idAuthor");
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found." });
    }
    res.status(200).json({ success: true, data: news });
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch news." });
  }
};

const addNews = async (req, res) => {
  const { title, description, published_date, status } = req.body;

  if (!description || !title || !status || !published_date) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  // Giả định userId được lấy từ middleware
  const userId = req.user.id; // Cách này cần đảm bảo req.user đã được thiết lập trước đó

  try {
    const newNews = new NewsModel({
      ...req.body,
      idAuthor: userId, // Liên kết với người dùng hiện tại
    });
    const savedNews = await newNews.save();
    res.status(201).json({ success: true, data: savedNews });
  } catch (error) {
    console.error("Error adding news:", error);
    res.status(500).json({ success: false, message: "Failed to add news." });
  }
};

const updateNews = async (req, res) => {
  const newsId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    return res.status(400).json({ success: false, message: "Invalid News ID" });
  }

  try {
    const updatedNews = await NewsModel.findByIdAndUpdate(newsId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNews) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    res.status(200).json({ success: true, data: updatedNews });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update news",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  const newsId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    return res.status(400).json({ success: false, message: "Invalid News ID" });
  }

  try {
    const deletedNews = await NewsModel.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete news",
      error: error.message,
    });
  }
};

export default {
  getListNews,
  addNews,
  getNews,
  updateNews,
  deleteNews,
};
