import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroSection from "./components/Hero";
import PropertyList from "./components/PropertiesDetails";
function Properties() {
  return (
    <>
      <HeaderAdmin />
      <HeroSection></HeroSection>
      <PropertyList></PropertyList>
      <Footer></Footer>
    </>
  );
}

export default Properties;
