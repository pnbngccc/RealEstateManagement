import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import Favorite from "./component/Favorite";
import HeroFavorite from "./component/Hero.jsx";

function FavoriteList() {
  return (
    <>
      <HeaderAdmin />
      <HeroFavorite />
      <Favorite />
      <Footer></Footer>
    </>
  );
}

export default FavoriteList;
