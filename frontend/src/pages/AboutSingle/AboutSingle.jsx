import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin.jsx";
import AboutList from "./components/AboutDetails.jsx";
import HeroAboutList from "./components/Hero.jsx";
function AboutSingle() {
  return (
    <>
      <HeaderAdmin/>
      <HeroAboutList />
      <AboutList />
      <Footer></Footer>
    </>
  );
}

export default AboutSingle;
