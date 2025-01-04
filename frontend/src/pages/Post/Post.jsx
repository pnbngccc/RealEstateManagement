import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../HomepageAdmin/components/Header/HeaderAdmin";
import HeroAdmin from "../HomepageAdmin/components/Hero/HeroAdmin";
 import PostForm from "./components/PostForm";

function PostArticle() {
  return (
    <>
      <HeaderAdmin />
      <HeroAdmin />
      <PostForm />
      <Footer />
    </>
  );
}

export default PostArticle;
