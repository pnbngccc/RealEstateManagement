import { useEffect } from "react";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "@assets/css/tiny-slider.css";
import AOS from "aos";
import { tns } from "tiny-slider/src/tiny-slider";
import heroBg1 from "@assets/images/hero_bg_1.jpg";
import heroBg2 from "@assets/images/hero_bg_2.jpg";
import heroBg3 from "@assets/images/hero_bg_3.jpg";

function HeroAdmin() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const slider = tns({
      container: ".hero-slide",
      items: 1,
      slideBy: 1,
      autoplay: true,
      autoplayButtonOutput: false,
      controls: true,
      nav: true,
      speed: 200,
    });

    return () => {
      if (slider && slider.destroy) {
        slider.destroy();
      }
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero-slide">
        <div
          className="img overlay"
          style={{ backgroundImage: `url(${heroBg3})` }}
        ></div>
        <div
          className="img overlay"
          style={{ backgroundImage: `url(${heroBg2})` }}
        ></div>
        <div
          className="img overlay"
          style={{ backgroundImage: `url(${heroBg1})` }}
        ></div>
      </div>
    </div>
  );
}

export default HeroAdmin;
