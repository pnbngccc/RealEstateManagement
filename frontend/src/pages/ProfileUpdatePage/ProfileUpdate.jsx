import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroProfilePage from "./components/Hero";
import ProfilePage from "./components/ProfileUpdate";
function ProfileUpdate() {
  return (
    <>
      <HeaderAdmin />
      <HeroProfilePage></HeroProfilePage>
      <ProfilePage></ProfilePage>
      <Footer></Footer>
    </>
  );
}
export default ProfileUpdate;
