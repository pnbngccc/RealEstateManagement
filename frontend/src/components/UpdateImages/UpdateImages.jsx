import { useEffect, useState, createContext } from "react";

const CloudinaryScriptContext = createContext();

function UploadImages({ uwConfig, setPublicIds, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const uwScript = document.getElementById("uw");

    if (!uwConfig && !loaded) {
      const script = document.createElement("script");
      script.setAttribute("async", true);
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.onload = () => setLoaded(true);
      script.onerror = () => console.error("Failed to load Cloudinary script");
      document.body.appendChild(script);
    } else if (uwConfig) {
      setLoaded(true);
    }

    // Cleanup script on unmount
    return () => {
      if (uwScript) {
        document.body.removeChild(uwScript);
      }
    };
  }, [uwConfig, loaded]);

  const initializeUploadWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            setState((prev) => [...prev, result.info.secure_url]); // Cập nhật hình ảnh
          }
        }
      );
      document.getElementById("upload_widget").addEventListener(
        "click",
        () => {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type="button" // Thêm type="button" để ngăn submit
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeUploadWidget}
      >
        Upload Image
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadImages;
export { CloudinaryScriptContext };
