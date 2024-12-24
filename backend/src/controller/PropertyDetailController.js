// import PropertyDetailModel from "../models/PropertyDetailModel.js";
// import mongoose from "mongoose";
// const getListPropertiesDetail = async (req, res) => {
//   const { page = 1, limit = 20 } = req.query;
//   const maxLimit = 100; // Giới hạn tối đa
//   const pageNumber = parseInt(page, 10);
//   const limitNumber = Math.min(parseInt(limit, 10), maxLimit); // Giới hạn tối đa
//   try {
//     const PropertiesDetail = await PropertyDetailModel.find()
//       .skip((pageNumber - 1) * limitNumber)
//       .limit(limitNumber)
//       .populate("idProperty"); // Lấy chi tiết liên kết
//     const total = await PropertyDetailModel.countDocuments();

//     res.status(200).json({
//       success: true,
//       data: PropertiesDetail,
//       meta: {
//         total,
//         page: pageNumber,
//         limit: limitNumber,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching PropertiesDetail:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch PropertiesDetail." });
//   }
// };
// const getListPropertyDetail = async (req, res) => {
//   try {
//     const propertyDetailId = req.params.id;
//     const propertyDetail = await PropertyDetailModel.findById(
//       propertyDetailId
//     ).populate("idProperty");
//     if (!propertyDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: "PropertyDetail not found." });
//     }
//     res.status(200).json({ success: true, data: propertyDetail });
//   } catch (error) {
//     console.error("Error fetching propertyDetail by ID:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch property." });
//   }
// };
// const addPropertiesDetail = async (req, res) => {
//   const { area, beds, bath } = req.body;

//   if (area === undefined) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing required fields." });
//   }
//   // Lấy userId từ thông tin người dùng đã xác thực
//   // const userId = req.user.id; // Hoặc cách nào đó để lấy userId
//   const propertyId = req.params.id;

//   try {
//     const newPropertyDetail = new PropertyDetailModel({
//       ...req.body,
//       idProperty: propertyId, // Liên kết với người dùng hiện tại
//     });
//     const savedPropertyDetail = await newPropertyDetail.save();
//     res.status(201).json({ success: true, data: savedPropertyDetail });
//   } catch (error) {
//     console.error("Error adding propertyDetail:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to add propertyDetail." });
//   }
// };
// const updatePropertiesDetail = async (req, res) => {
//   const propertyDetailId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(propertyDetailId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid PropertyDetail ID" });
//   }

//   try {
//     const updatedPropertyDetail = await PropertyDetailModel.findByIdAndUpdate(
//       propertyDetailId,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedPropertyDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: "PropertyDetail not found" });
//     }

//     res.status(200).json({ success: true, data: updatedPropertyDetail });
//   } catch (error) {
//     console.error("Error updating propertyDetail:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update propertyDetail",
//       error: error.message,
//     });
//   }
// };

// const deletePropertiesDetail = async (req, res) => {
//   const propertyDetailId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(propertyDetailId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid PropertyDetail ID" });
//   }

//   try {
//     const deletedPropertyDetail = await PropertyDetailModel.findByIdAndDelete(
//       propertyDetailId
//     );

//     if (!deletedPropertyDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: "PropertyDetail not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "PropertyDetail deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting propertyDetail:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete propertyDetail",
//       error: error.message,
//     });
//   }
// };

// export default {
//   getListPropertyDetail,
//   addPropertiesDetail,
//   getListPropertiesDetail,
//   updatePropertiesDetail,
//   deletePropertiesDetail,
// };
import PropertyDetailModel from "../models/PropertyDetailModel.js";
import mongoose from "mongoose";

const getListPropertiesDetail = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const maxLimit = 100; // Giới hạn tối đa
  const pageNumber = parseInt(page, 10);
  const limitNumber = Math.min(parseInt(limit, 10), maxLimit); // Giới hạn tối đa

  try {
    const propertiesDetail = await PropertyDetailModel.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("idProperty"); // Lấy chi tiết liên kết
    const total = await PropertyDetailModel.countDocuments();

    res.status(200).json({
      success: true,
      data: propertiesDetail,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching PropertiesDetail:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch PropertiesDetail." });
  }
};

const getListPropertyDetail = async (req, res) => {
  try {
    const propertyDetailId = req.params.id;
    const propertyDetail = await PropertyDetailModel.findById(
      propertyDetailId
    ).populate("idProperty");
    if (!propertyDetail) {
      return res
        .status(404)
        .json({ success: false, message: "PropertyDetail not found." });
    }
    res.status(200).json({ success: true, data: propertyDetail });
  } catch (error) {
    console.error("Error fetching propertyDetail by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch property." });
  }
};

const addPropertiesDetail = async (req, res) => {
  const { area, beds, bath } = req.body;

  if (area === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  const propertyId = req.params.id;

  try {
    const newPropertyDetail = new PropertyDetailModel({
      ...req.body,
      idProperty: propertyId, // Liên kết với bất động sản
    });
    const savedPropertyDetail = await newPropertyDetail.save();
    res.status(201).json({ success: true, data: savedPropertyDetail });
  } catch (error) {
    console.error("Error adding propertyDetail:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add propertyDetail." });
  }
};

const updatePropertiesDetail = async (req, res) => {
  const propertyDetailId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(propertyDetailId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid PropertyDetail ID" });
  }

  try {
    const updatedPropertyDetail = await PropertyDetailModel.findByIdAndUpdate(
      propertyDetailId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPropertyDetail) {
      return res
        .status(404)
        .json({ success: false, message: "PropertyDetail not found" });
    }

    res.status(200).json({ success: true, data: updatedPropertyDetail });
  } catch (error) {
    console.error("Error updating propertyDetail:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update propertyDetail",
      error: error.message,
    });
  }
};

const deletePropertiesDetail = async (req, res) => {
  const propertyDetailId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(propertyDetailId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid PropertyDetail ID" });
  }

  try {
    const deletedPropertyDetail = await PropertyDetailModel.findByIdAndDelete(
      propertyDetailId
    );

    if (!deletedPropertyDetail) {
      return res
        .status(404)
        .json({ success: false, message: "PropertyDetail not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "PropertyDetail deleted successfully" });
  } catch (error) {
    console.error("Error deleting propertyDetail:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete propertyDetail",
      error: error.message,
    });
  }
};

export default {
  getListPropertyDetail,
  addPropertiesDetail,
  getListPropertiesDetail,
  updatePropertiesDetail,
  deletePropertiesDetail,
};
