import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroProjectList from "./components/Hero";
import ProjectDetail from "./components/ProjectDetails";
function ProjectPageList() {
  return (
    <>
      <HeaderAdmin />
      <HeroProjectList></HeroProjectList>
      <ProjectDetail />
      <Footer></Footer>
    </>
  );
}

export default ProjectPageList;
