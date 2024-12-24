import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin.jsx";
import AboutList from "./components/About/About.jsx";
import HeroAbout from "./components/Hero.jsx";
function About() {
  return (
    <>
      <HeaderAdmin />
      <HeroAbout />
      <AboutList></AboutList>
      <Footer></Footer>
    </>
  );
}

export default About;
