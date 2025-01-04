import hero_bg_3 from "@assets/images/hero_bg_3.jpg";

function HeroFavorite() {
  return (
    <div
      className="hero page-inner overlay"
      style={{ backgroundImage: `url(${hero_bg_3})` }}
    ></div>
  );
}
export default HeroFavorite;
