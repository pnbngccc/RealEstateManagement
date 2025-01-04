import ListProperties from "../Content/ListProperties";
import Header from "../Header/Header";
import SearchBar from "../Hero/SearchBar";
import ListProject from "../Content/ListProject";
import Features from "../Content/Feature.jsx";
import HomeSection from "../Content/HomeContent.jsx";
import CallToAction from "../Content/Agent.jsx";
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
        <HomeSection />
        <CallToAction />
        <Footer />
      </>
    </div>
  );
}

export default Homepage;
