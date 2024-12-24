import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import Hero from "./component/Hero";
import PropertyList from "./component/Properties/Properties";
function Properties() {
  return (
    <>
      <HeaderAdmin />
      <Hero></Hero>
      <PropertyList />
      <Footer></Footer>
    </>
  );
}

export default Properties;
