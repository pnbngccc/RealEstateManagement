import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
import PropertyForm from "./components/PropertiesList";

function PropertyList() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <PropertyForm/>
      <Footer></Footer>
    </>
  );
}

export default PropertyList;
