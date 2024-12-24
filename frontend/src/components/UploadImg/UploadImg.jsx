// import { useEffect, useRef } from "react";

// const CloudinaryUploadWidget = ({ uwConfig, setPublicId, setAvatar }) => {
//   const uploadWidgetRef = useRef(null);
//   const uploadButtonRef = useRef(null);

//   useEffect(() => {
//     const initializeUploadWidget = () => {
//       if (window.cloudinary && uploadButtonRef.current) {
//         uploadWidgetRef.current = window.cloudinary.createUploadWidget(
//           uwConfig,
//           (error, result) => {
//             if (!error && result && result.event === "success") {
//               console.log("Upload successful:", result.info);
//               //   setPublicId(result.info.public_id);
//               setAvatar(result.info.secure_url); // Cập nhật avatar với URL mới
//             }
//           }
//         );

//         // Add click event to open widget
//         const handleUploadClick = () => {
//           if (uploadWidgetRef.current) {
//             uploadWidgetRef.current.open();
//           }
//         };

//         const buttonElement = uploadButtonRef.current;
//         buttonElement.addEventListener("click", handleUploadClick);

//         // Cleanup
//         return () => {
//           buttonElement.removeEventListener("click", handleUploadClick);
//         };
//       }
//     };

//     initializeUploadWidget();
//   }, [uwConfig, setPublicId, setAvatar]);

//   return (
//     <button
//       ref={uploadButtonRef}
//       id="upload_widget"
//       className="cloudinary-button"
//     >
//       Upload Image
//     </button>
//   );
// };

// export default CloudinaryUploadWidget;
import { useEffect, useRef } from "react";

const CloudinaryUploadWidget = ({ uwConfig, setPublicId, setAvatar }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Upload successful:", result.info);
              // Cập nhật avatar với URL mới
              setAvatar(result.info.secure_url);
            }
          }
        );

        // Thêm sự kiện click để mở widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener("click", handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener("click", handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId, setAvatar]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload Image
    </button>
  );
};

export default CloudinaryUploadWidget;
