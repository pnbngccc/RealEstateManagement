import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
import ReportDashboard from "./components/ReportAdmin";

function ReportAdminList() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <ReportDashboard />
      <Footer></Footer>
    </>
  );
}

export default ReportAdminList;
