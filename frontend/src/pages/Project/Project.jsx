import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroProject from "./components/Hero";
import ProjectList from "./components/Project/Project";
function Project() {
  return (
    <>
      <HeaderAdmin />
      <HeroProject />
      <ProjectList></ProjectList>
      <Footer></Footer>
    </>
  );
}

export default Project;
