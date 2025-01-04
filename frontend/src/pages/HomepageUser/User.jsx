import CallToAction from "../../components/Content/Agent";
import Features from "../../components/Content/Feature";
import HomeSection from "../../components/Content/HomeContent";
import ListProject from "../../components/Content/ListProject";
import ListProperties from "../../components/Content/ListProperties";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/Hero/SearchBar";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";

function Users() {
  return (
    <>
      <HeaderAdmin />
      <SearchBar />
      <ListProperties />
      <ListProject />
      <Features />
      <HomeSection />
      <CallToAction />
      <Footer></Footer>
    </>
  );
}

export default Users;
