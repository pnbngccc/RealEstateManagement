import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroProjectList from "./components/Hero";
import ProjectList from "./components/ProjectDetails";
function ProjectPageList() {
  return (
    <>
      <HeaderAdmin />
      <HeroProjectList></HeroProjectList>
      <ProjectList></ProjectList>
      <Footer></Footer>
    </>
  );
}

export default ProjectPageList;
