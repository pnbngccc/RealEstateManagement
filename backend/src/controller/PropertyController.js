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

// import PropertyModel from "../models/PropertyModel.js";
// import PropertyDetailModel from "../models/PropertyDetailModel.js"; // Import mô hình chi tiết
// import mongoose from "mongoose";

// const getListProperties = async (req, res) => {
//   const {
//     page = 1,
//     limit = 20,
//     city,
//     minPrice,
//     maxPrice,
//     propertyType,
//   } = req.query;

//   const maxLimit = 100;
//   const pageNumber = parseInt(page, 10);
//   const limitNumber = Math.min(parseInt(limit, 10), maxLimit);
//   const query = {};

//   // Thêm logic lọc theo thành phố
//   if (city) {
//     query.address = { $regex: city, $options: "i" };
//   }

//   // Thêm logic lọc theo giá
//   if (minPrice && !isNaN(minPrice)) {
//     query.price = { ...query.price, $gte: parseFloat(minPrice) };
//   }
//   if (maxPrice && !isNaN(maxPrice)) {
//     query.price = { ...query.price, $lte: parseFloat(maxPrice) };
//   }

//   // Thêm logic lọc theo loại bất động sản
//   if (propertyType && propertyType !== "all") {
//     query.property_type = propertyType; // Nếu loại bất động sản không phải "all", áp dụng lọc
//   }

//   try {
//     const properties = await PropertyModel.find(query)
//       .skip((pageNumber - 1) * limitNumber)
//       .limit(limitNumber)
//       .populate("idUser");
//     const total = await PropertyModel.countDocuments(query);

//     if (properties.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Không tìm thấy bất động sản." });
//     }

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
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch properties.",
//       error: error.message,
//     });
//   }
// };
// const getListProperty = async (req, res) => {
//   try {
//     const propertyId = req.params.id;
//     // Kiểm tra xem propertyId có phải là ObjectId hợp lệ không
//     if (!mongoose.Types.ObjectId.isValid(propertyId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Property ID" });
//     }
//     const id = "6766fe8b50fe58844a7dbca5"; // Thay thế bằng ID của bạn
//     console.log(mongoose.Types.ObjectId.isValid(id)); // Kết quả sẽ là true hoặc false
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
//   const userId = req.user.id; // Đảm bảo rằng req.user đã được thiết lập bởi middleware

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
// const getPropertyReport = async (req, res) => {
//   try {
//     const properties = await PropertyModel.find();

//     if (!properties.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No properties found.",
//       });
//     }

//     const reportData = {
//       total: properties.length,
//       byType: {},
//       byStatus: {},
//     };

//     properties.forEach((property) => {
//       const type = property.property_type || "Unknown";
//       reportData.byType[type] = (reportData.byType[type] || 0) + 1;

//       const status = property.status || "Unknown";
//       reportData.byStatus[status] = (reportData.byStatus[status] || 0) + 1;
//     });

//     res.status(200).json({ success: true, data: reportData });
//   } catch (error) {
//     console.error("Error fetching property report:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch property report.",
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
//   getPropertyReport,
// };

import PropertyModel from "../models/PropertyModel.js";
import mongoose from "mongoose";

const getListProperties = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    idUser,
    city,
    minPrice,
    maxPrice,
    propertyType,
  } = req.query;

  const maxLimit = 100;
  const pageNumber = parseInt(page, 10);
  const limitNumber = Math.min(parseInt(limit, 10), maxLimit);
  const query = {};

    // Lọc theo idUser (người dùng hiện tại)
    if (idUser) {
      query.idUser = mongoose.Types.ObjectId(idUser); // Lọc theo idUser
    }

  // Lọc theo thành phố
  if (city) {
    query.address = { $regex: city, $options: "i" };
  }

  // Lọc theo giá
  if (minPrice && !isNaN(minPrice)) {
    query.price = { ...query.price, $gte: parseFloat(minPrice) };
  }
  if (maxPrice && !isNaN(maxPrice)) {
    query.price = { ...query.price, $lte: parseFloat(maxPrice) };
  }

  // Lọc theo loại bất động sản
  if (propertyType && propertyType !== "all") {
    query.property_type = propertyType;
  }

  try {
    const properties = await PropertyModel.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("idUser");

    const total = await PropertyModel.countDocuments(query);

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
    console.error("Error fetching properties:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties.",
    });
  }
};

const getListProperty = async (req, res) => {
  const propertyId = req.params.id;
  console.log("Received property ID:", propertyId);

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    console.error("Invalid Property ID format:", propertyId);
    return res
      .status(400)
      .json({ success: false, message: "Invalid Property ID" });
  }

  try {
    const property = await PropertyModel.findById(propertyId).populate(
      "idUser"
    );
    console.log("Fetched property from database:", property);

    if (!property) {
      console.warn("Property not found for ID:", propertyId);
      return res
        .status(404)
        .json({ success: false, message: "Property not found." });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error("Error fetching property by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property.",
    });
  }
};

const addProperties = async (req, res) => {
  const { price, title, property_type, beds, bath, status, address, area } =
    req.body;

  console.log("Received data to add property:", req.body);

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
    console.error("Missing required fields:", req.body);
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  const userId = req.user.id;

  try {
    const newProperty = new PropertyModel({ ...req.body, idUser: userId });
    const savedProperty = await newProperty.save();

    // const newPropertyDetail = new PropertyDetailModel({
    //   ...req.body,
    //   idProperty: savedProperty._id,
    // });
    // const savedPropertyDetail = await newPropertyDetail.save();

    // savedProperty.details.push(savedPropertyDetail._id);
    // await savedProperty.save();

    // console.log("Property added successfully:", savedProperty);

    res.status(201).json({ success: true, data: savedProperty });
  } catch (error) {
    console.error("Error adding property:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add property.",
    });
  }
};

const updateProperties = async (req, res) => {
  const propertyId = req.params.id?.trim();

  console.log("Received property ID to update:", propertyId);
  console.log("Update data:", req.body);

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    console.error("Invalid Property ID format:", propertyId);
    return res
      .status(400)
      .json({ success: false, message: "Invalid Property ID" });
  }

  try {
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      propertyId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      console.warn("Property not found for update ID:", propertyId);
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    console.log("Property updated successfully:", updatedProperty);

    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    console.error("Error updating property:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
    });
  }
};

const deleteProperties = async (req, res) => {
  const propertyId = req.params.id?.trim();

  console.log("Received property ID to delete:", propertyId);

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    console.error("Invalid Property ID format:", propertyId);
    return res
      .status(400)
      .json({ success: false, message: "Invalid Property ID" });
  }

  try {
    const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      console.warn("Property not found for delete ID:", propertyId);
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    console.log("Property deleted successfully:", deletedProperty);

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};

const getPropertyReport = async (req, res) => {
  try {
    const properties = await PropertyModel.find();

    if (!properties.length) {
      console.warn("No properties found in the database");
      return res
        .status(404)
        .json({ success: false, message: "No properties found." });
    }

    const reportData = {
      total: properties.length,
      byType: {},
      byStatus: {},
    };

    properties.forEach((property) => {
      const type = property.property_type || "Unknown";
      reportData.byType[type] = (reportData.byType[type] || 0) + 1;

      const status = property.status || "Unknown";
      reportData.byStatus[status] = (reportData.byStatus[status] || 0) + 1;
    });

    res.status(200).json({ success: true, data: reportData });
  } catch (error) {
    console.error("Error fetching property report:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property report.",
    });
  }
};

export default {
  getListProperty,
  addProperties,
  getListProperties,
  updateProperties,
  deleteProperties,
  getPropertyReport,
};
