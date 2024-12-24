import CallToAction from "../../components/Content/Agent";
import AgentsSection from "../../components/Content/AgentSection";
import Features from "../../components/Content/Feature";
import HomeSection from "../../components/Content/HomeContent";
import ListProject from "../../components/Content/ListProject";
import ListProperties from "../../components/Content/ListProperties";
import Testimonialdata from "../../components/Content/Testimonialdata";
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
      <Testimonialdata />
      <HomeSection />
      <CallToAction />
      <AgentsSection />
      <Footer></Footer>
    </>
  );
}

export default Users;
