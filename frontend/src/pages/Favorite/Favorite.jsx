import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
import Favorite from "./component/Favorite";

function FavoriteList() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <Favorite />
      <Footer></Footer>
    </>
  );
}

export default FavoriteList;
