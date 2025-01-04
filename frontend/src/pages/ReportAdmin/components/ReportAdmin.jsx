import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register necessary scales and elements
Chart.register(CategoryScale, LinearScale, BarElement);

const ReportDashboard = () => {
  const [reportData, setReportData] = useState({ byType: {}, byStatus: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch report data
  const fetchPropertyReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/property/report"
      );
      setReportData(response.data.data); // Đặt dữ liệu vào state
    } catch (error) {
      console.error(
        "Error fetching property report:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to fetch report data."); // Cập nhật thông báo lỗi
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPropertyReport();
  }, []);

  // Prepare data for the type chart
  const dataByType = {
    labels: Object.keys(reportData.byType),
    datasets: [
      {
        label: "Số lượng bất động sản theo loại",
        data: Object.values(reportData.byType),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare data for the status chart
  const dataByStatus = {
    labels: Object.keys(reportData.byStatus),
    datasets: [
      {
        label: "Số lượng bất động sản theo trạng thái",
        data: Object.values(reportData.byStatus),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Báo cáo Bất động sản</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h4>Báo cáo theo loại:</h4>
          {dataByType.labels.length > 0 ? (
            <Bar data={dataByType} />
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
          <h4>Báo cáo theo trạng thái:</h4>
          {dataByStatus.labels.length > 0 ? (
            <Bar data={dataByStatus} />
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ReportDashboard;
