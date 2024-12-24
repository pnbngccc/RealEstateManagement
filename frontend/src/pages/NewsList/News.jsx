import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
import NewForm from "./components/NewsList";

function NewsList() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <NewForm />
      <Footer></Footer>
    </>
  );
}

export default NewsList;
