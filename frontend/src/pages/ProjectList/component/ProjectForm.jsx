// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./List.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

// const ProjectForm = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProject, setEditingProject] = useState(null);
//   const [newProject, setNewProject] = useState({
//     title: "",
//     image: "",
//     publicId: "",
//     description: "",
//     area: "",
//     address: "",
//     building: "", // Thêm building
//     apartment: "", // Thêm apartment
//     status: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   // Fetch properties from API
//   const fetchProjects = async (page = 1, limit = 10) => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/project", {
//         params: { page, limit },
//         withCredentials: true,
//       });
//       setProjects(response.data.data || []);
//       setTotal(response.data.meta.total);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       setError(error.response?.data?.message || "Failed to fetch project.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(currentPage, limit);
//   }, [currentPage, limit]);

//   const handleEdit = (project) => {
//     setEditingProject(project);
//     setNewProject({
//       title: project.title || "",
//       description: project.description || "",
//       image: project.image || "",
//       address: project.address || "",
//       publicId: project.publicId || "",
//       area: project.area || "",
//       building: project.building || "", // Cập nhật building
//       apartment: project.apartment || "", // Cập nhật apartment
//       status: project.status || "",
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/project/${id}`, {
//         withCredentials: true,
//       });
//       setProjects(projects.filter((project) => project._id !== id));
//     } catch (error) {
//       console.error("Error deleting project:", error);
//       setError(error.response?.data?.message || "Failed to delete project.");
//     }
//   };

//   const handleAdd = async () => {
//     if (
//       !newProject.title ||
//       !newProject.description ||
//       !newProject.image ||
//       !newProject.address ||
//       !newProject.area ||
//       !newProject.status
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     const projectData = {
//       ...newProject,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/project/",
//         projectData,
//         {
//           withCredentials: true,
//         }
//       );

//       setProjects((prevProjects) => [...prevProjects, response.data.data]);
//       setTotal((prevTotal) => prevTotal + 1);
//       setNewProject({
//         title: "",
//         description: "",
//         image: "",
//         address: "",
//         publicId: "",
//         area: "",
//         building: "", // Reset building
//         apartment: "", // Reset apartment
//         status: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error adding Project:", error);
//       setError(error.response?.data?.message || "Failed to add Project.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingProject ||
//       !newProject.title ||
//       !newProject.description ||
//       !newProject.image ||
//       !newProject.address ||
//       !newProject.area ||
//       !newProject.status
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/project/${editingProject._id}`,
//         newProject,
//         {
//           withCredentials: true,
//         }
//       );
//       setProjects(
//         projects.map((project) =>
//           project._id === editingProject._id ? response.data.data : project
//         )
//       );
//       setEditingProject(null);
//       setNewProject({
//         title: "",
//         description: "",
//         image: "",
//         publicId: "",
//         area: "",
//         address: "",
//         building: "", // Reset building
//         apartment: "", // Reset apartment
//         status: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error updating project:", error);
//       setError(error.response?.data?.message || "Failed to update project.");
//     }
//   };

//   const handleUploadSuccess = (url, publicId) => {
//     setNewProject({ ...newProject, image: url, publicId });
//   };

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearchTerm = project.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return matchesSearchTerm;
//   });

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h2>Danh sách dự án</h2>
//           <button
//             className="btn-create"
//             onClick={() => {
//               setShowForm(true);
//               setEditingProject(null);
//             }}
//           >
//             <i className="fas fa-plus"></i>
//           </button>
//         </div>
//         {error && <div className="error-message text-danger">{error}</div>}
//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Tìm kiếm bất động sản..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//             }}
//             style={{ height: "40px" }}
//           />
//           <button className="btn-search">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <div className="mb-3">
//           <h4>{editingProject ? "Update Project" : "Add Project"}</h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newProject.title || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               value={newProject.address || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, address: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Description"
//               value={newProject.description || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, description: e.target.value })
//               }
//               rows="4"
//               style={{ resize: "vertical", width: "100%" }}
//             />

//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv", // Thay bằng thông tin Cloudinary của bạn
//                 uploadPreset: "estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "projects",
//               }}
//               setAvatar={(url) => handleUploadSuccess(url, "")}
//             />
//             {newProject.image && (
//               <div>
//                 <img
//                   src={newProject.image}
//                   alt="Project"
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     marginTop: "10px",
//                   }}
//                 />
//               </div>
//             )}
//             <input
//               type="number"
//               placeholder="Area"
//               value={newProject.area || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, area: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Building"
//               value={newProject.building || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, building: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Apartment"
//               value={newProject.apartment || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, apartment: e.target.value })
//               }
//             />

//             <select
//               value={newProject.status || ""}
//               onChange={(e) =>
//                 setNewProject({ ...newProject, status: e.target.value })
//               }
//             >
//               <option value="">Chọn trạng thái</option>
//               <option value="Đang bán">Đang mở bán</option>
//               <option value="Đang cập nhật">Đang cập nhật</option>
//               <option value="Đã bàn giao">Đã bàn giao</option>
//             </select>
//             <button onClick={editingProject ? handleUpdate : handleAdd}>
//               {editingProject ? "Update" : "Add"}
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loading-spinner">Loading...</div>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>ID</th>
//               <th>Hình</th>
//               <th>Tiêu đề</th>
//               <th>Địa chỉ</th>
//               <th>Nội dung</th>
//               <th>Diện tích</th>
//               <th>Building</th>
//               <th>Apartment</th>
//               <th>Trạng thái</th>
//               <th>ID user</th>
//               <th style={{ width: "180px" }}>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProjects.length > 0 ? (
//               filteredProjects.map((project) => (
//                 <tr key={project._id}>
//                   <td>{project._id}</td>
//                   <td>
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>{project.title}</td>
//                   <td>{project.address}</td>
//                   <td
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {project.description}
//                   </td>
//                   <td>{project.area} ha</td>
//                   <td>{project.building || "--"}</td>
//                   <td>{project.apartment || "--"}</td>
//                   <td>{project.status}</td>
//                   <td>{project.idUser ? project.idUser._id : "Unknown"}</td>
//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(project)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(project._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center">
//                   Không tìm thấy dự án
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//       {/* Điều khiển phân trang Bootstrap */}
//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center">
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {[...Array(Math.ceil(total / limit))].map((_, index) => (
//             <li
//               className={`page-item ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//               key={index}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(prev + 1, Math.ceil(total / limit))
//                 )
//               }
//               disabled={currentPage >= Math.ceil(total / limit)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default ProjectForm;

import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";
import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

const ProjectForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    image: "",
    publicId: "",
    description: "",
    area: "",
    address: "",
    building: "",
    apartment: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch properties from API
  const fetchProjects = async (page = 1, limit = 10) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get("http://localhost:5000/api/project", {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token qua header
        },
      });
      setProjects(response.data.data || []);
      setTotal(response.data.meta.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.response?.data?.message || "Failed to fetch project.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, limit);
  }, [currentPage, limit]);

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      address: project.address || "",
      publicId: project.publicId || "",
      area: project.area || "",
      building: project.building || "",
      apartment: project.apartment || "",
      status: project.status || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token qua header
        },
      });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      setError(error.response?.data?.message || "Failed to delete project.");
    }
  };

  const handleAdd = async () => {
    if (
      !newProject.title ||
      !newProject.description ||
      !newProject.image ||
      !newProject.address ||
      !newProject.area ||
      !newProject.status
    ) {
      alert("All fields are required!");
      return;
    }

    const projectData = {
      ...newProject,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/project/",
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        }
      );

      setProjects((prevProjects) => [...prevProjects, response.data.data]);
      setTotal((prevTotal) => prevTotal + 1);
      setNewProject({
        title: "",
        description: "",
        image: "",
        address: "",
        publicId: "",
        area: "",
        building: "",
        apartment: "",
        status: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding Project:", error);
      setError(error.response?.data?.message || "Failed to add Project.");
    }
  };

  const handleUpdate = async () => {
    if (
      !editingProject ||
      !newProject.title ||
      !newProject.description ||
      !newProject.image ||
      !newProject.address ||
      !newProject.area ||
      !newProject.status
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/project/${editingProject._id}`,
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        }
      );
      setProjects(
        projects.map((project) =>
          project._id === editingProject._id ? response.data.data : project
        )
      );
      setEditingProject(null);
      setNewProject({
        title: "",
        description: "",
        image: "",
        publicId: "",
        area: "",
        address: "",
        building: "",
        apartment: "",
        status: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error updating project:", error);
      setError(error.response?.data?.message || "Failed to update project.");
    }
  };

  const handleUploadSuccess = (url, publicId) => {
    setNewProject({ ...newProject, image: url, publicId });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearchTerm = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-between align-items-center ">
          <h2>Danh sách dự án</h2>
          <button
            className="btn-create"
            onClick={() => {
              setShowForm(true);
              setEditingProject(null);
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {error && <div className="error-message text-danger">{error}</div>}
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Tìm kiếm bất động sản..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{ height: "40px" }}
          />
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-3">
          <h4>{editingProject ? "Update Project" : "Add Project"}</h4>
          <div className="input-group">
            <input
              type="text"
              placeholder="Title"
              value={newProject.title || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              value={newProject.address || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, address: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newProject.description || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              rows="4"
              style={{ resize: "vertical", width: "100%" }}
            />

            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "djlc7ihxv", // Thay bằng thông tin Cloudinary của bạn
                uploadPreset: "estate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "projects",
              }}
              setAvatar={(url) => handleUploadSuccess(url, "")}
            />
            {newProject.image && (
              <div>
                <img
                  src={newProject.image}
                  alt="Project"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
            <input
              type="number"
              placeholder="Area"
              value={newProject.area || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, area: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Building"
              value={newProject.building || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, building: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Apartment"
              value={newProject.apartment || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, apartment: e.target.value })
              }
            />

            <select
              value={newProject.status || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, status: e.target.value })
              }
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đang bán">Đang mở bán</option>
              <option value="Đang cập nhật">Đang cập nhật</option>
              <option value="Đã bàn giao">Đã bàn giao</option>
            </select>
            <button onClick={editingProject ? handleUpdate : handleAdd}>
              {editingProject ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Hình</th>
              <th>Tiêu đề</th>
              <th>Địa chỉ</th>
              <th>Nội dung</th>
              <th>Diện tích</th>
              <th>Building</th>
              <th>Apartment</th>
              <th>Trạng thái</th>
              <th>ID user</th>
              <th style={{ width: "180px" }}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td>{project._id}</td>
                  <td>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{project.title}</td>
                  <td>{project.address}</td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.description}
                  </td>
                  <td>{project.area} ha</td>
                  <td>{project.building || "--"}</td>
                  <td>{project.apartment || "--"}</td>
                  <td>{project.status}</td>
                  <td>{project.idUser ? project.idUser._id : "Unknown"}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(project)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(project._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  Không tìm thấy dự án
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* Điều khiển phân trang Bootstrap */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(Math.ceil(total / limit))].map((_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(total / limit))
                )
              }
              disabled={currentPage >= Math.ceil(total / limit)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProjectForm;
