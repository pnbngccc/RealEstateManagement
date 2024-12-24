import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroProfile from "./components/Hero";
import ProfileMain from "./components/Profile";
function Profile() {
  return (
    <>
      <HeaderAdmin />
      <HeroProfile></HeroProfile>
      <ProfileMain></ProfileMain>
      <Footer></Footer>
    </>
  );
}

export default Profile;
