// import PropertyModel from "../models/PropertyModel.js";
// import PropertyDetailModel from "../models/PropertyDetailModel.js"; // Import mô hình chi tiết

// import mongoose from "mongoose";
// const getListProperties = async (req, res) => {
//   const { page = 1, limit = 20 } = req.query;
//   const maxLimit = 100; // Giới hạn tối đa
//   const pageNumber = parseInt(page, 10);
//   const limitNumber = Math.min(parseInt(limit, 10), maxLimit); // Giới hạn tối đa
//   try {
//     const properties = await PropertyModel.find()
//       .skip((pageNumber - 1) * limitNumber)
//       .limit(limitNumber)
//       .populate("idUser"); // Lấy chi tiết liên kết
//     const total = await PropertyModel.countDocuments();

//     res.status(200).json({
//       success: true,
//       data: properties,
//       meta: {
//         total,
//         page: pageNumber,
//         limit: limitNumber,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch properties." });
//   }
// };
// const getListProperty = async (req, res) => {
//   try {
//     const propertyId = req.params.id;
//     const property = await PropertyModel.findById(propertyId).populate(
//       "idUser"
//     );
//     if (!property) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Property not found." });
//     }
//     res.status(200).json({ success: true, data: property });
//   } catch (error) {
//     console.error("Error fetching property by ID:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch property." });
//   }
// };
// const addProperties = async (req, res) => {
//   const { price, title, property_type, beds, bath, status, address, area } =
//     req.body;

//   if (
//     !price ||
//     !title ||
//     !status ||
//     !address ||
//     !property_type ||
//     beds === undefined ||
//     bath === undefined ||
//     area === undefined
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing required fields." });
//   }
//   // Lấy userId từ thông tin người dùng đã xác thực
//   const userId = req.user.id; // Hoặc cách nào đó để lấy userId
//   try {
//     const newProperty = new PropertyModel({
//       ...req.body,
//       idUser: userId, // Liên kết với người dùng hiện tại
//     });
//     const savedProperty = await newProperty.save();
//     const newPropertyDetail = new PropertyDetailModel({
//       ...req.body,
//       idProperty: savedProperty._id, // Liên kết chi tiết với bất động sản đã lưu
//     });
//     const savedPropertyDetail = await newPropertyDetail.save();
//     // Cập nhật chi tiết vào bất động sản
//     savedProperty.details.push(savedPropertyDetail._id);
//     await savedProperty.save();
//     res.status(201).json({ success: true, data: savedProperty });
//   } catch (error) {
//     console.error("Error adding property:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to add property." });
//   }
// };
// const updateProperties = async (req, res) => {
//   const propertyId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(propertyId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Property ID" });
//   }

//   try {
//     const updatedProperty = await PropertyModel.findByIdAndUpdate(
//       propertyId,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedProperty) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Property not found" });
//     }

//     res.status(200).json({ success: true, data: updatedProperty });
//   } catch (error) {
//     console.error("Error updating property:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update property",
//       error: error.message,
//     });
//   }
// };

// const deleteProperties = async (req, res) => {
//   const propertyId = req.params.id?.trim();

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(propertyId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Property ID" });
//   }

//   try {
//     const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);

//     if (!deletedProperty) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Property not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Property deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting property:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete property",
//       error: error.message,
//     });
//   }
// };

// export default {
//   getListProperty,
//   addProperties,
//   getListProperties,
//   updateProperties,
//   deleteProperties,
// };
import PropertyModel from "../models/PropertyModel.js";
import PropertyDetailModel from "../models/PropertyDetailModel.js"; // Import mô hình chi tiết
import mongoose from "mongoose";

const getListProperties = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const maxLimit = 100; // Giới hạn tối đa
  const pageNumber = parseInt(page, 10);
  const limitNumber = Math.min(parseInt(limit, 10), maxLimit); // Giới hạn tối đa

  try {
    const properties = await PropertyModel.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("idUser"); // Lấy chi tiết liên kết
    const total = await PropertyModel.countDocuments();

    res.status(200).json({
      success: true,
      data: properties,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch properties." });
  }
};

const getListProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await PropertyModel.findById(propertyId).populate(
      "idUser"
    );
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found." });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch property." });
  }
};

const addProperties = async (req, res) => {
  const { price, title, property_type, beds, bath, status, address, area } =
    req.body;

  if (
    !price ||
    !title ||
    !status ||
    !address ||
    !property_type ||
    beds === undefined ||
    bath === undefined ||
    area === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  // Lấy userId từ thông tin người dùng đã xác thực
  const userId = req.user.id; // Đảm bảo rằng req.user đã được thiết lập bởi middleware

  try {
    const newProperty = new PropertyModel({
      ...req.body,
      idUser: userId, // Liên kết với người dùng hiện tại
    });
    const savedProperty = await newProperty.save();

    const newPropertyDetail = new PropertyDetailModel({
      ...req.body,
      idProperty: savedProperty._id, // Liên kết chi tiết với bất động sản đã lưu
    });
    const savedPropertyDetail = await newPropertyDetail.save();

    // Cập nhật chi tiết vào bất động sản
    savedProperty.details.push(savedPropertyDetail._id);
    await savedProperty.save();

    res.status(201).json({ success: true, data: savedProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add property." });
  }
};

const updateProperties = async (req, res) => {
  const propertyId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Property ID" });
  }

  try {
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      propertyId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

const deleteProperties = async (req, res) => {
  const propertyId = req.params.id?.trim();

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Property ID" });
  }

  try {
    const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
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

export default {
  getListProperty,
  addProperties,
  getListProperties,
  updateProperties,
  deleteProperties,
};
