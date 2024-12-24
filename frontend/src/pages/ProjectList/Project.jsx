import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
import ProjectForm from "./component/ProjectForm";

function ProjectList() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <ProjectForm />
      <Footer></Footer>
    </>
  );
}

export default ProjectList;
