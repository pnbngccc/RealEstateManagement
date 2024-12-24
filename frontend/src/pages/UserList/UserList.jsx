import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
import ListU from "./components/ListUser";

function UserList() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <ListU />
      <Footer></Footer>
    </>
  );
}

export default UserList;
