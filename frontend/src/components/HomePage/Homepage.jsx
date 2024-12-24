import ListProperties from "../Content/ListProperties";
import Header from "../Header/Header";
import SearchBar from "../Hero/SearchBar";
import ListProject from "../Content/ListProject";
// import "../../assets/js/bootstrap.bundle.min.js";
import Features from "../Content/Feature.jsx";
import Testimonialdata from "../Content/Testimonialdata.jsx";
import HomeSection from "../Content/HomeContent.jsx";
import CallToAction from "../Content/Agent.jsx";
import AgentsSection from "../Content/AgentSection.jsx";
import Footer from "../Footer/Footer.jsx";

function Homepage() {
  return (
    <div>
      <>
        <Header />

        <SearchBar />
        <ListProperties />
        <ListProject />
        <Features />
        <Testimonialdata />
        <HomeSection />
        <CallToAction />
        <AgentsSection />
        <Footer />
      </>
    </div>
  );
}

export default Homepage;
