import { useEffect, useState } from "react";
import "../../assets/css/style.css";
import AOS from "aos";
import { tns } from "tiny-slider/src/tiny-slider";
import axios from "axios";
import "aos/dist/aos.css";
import "../../assets/css/tiny-slider.css";

import imgPerson1 from "../../assets/images/person_1-min.jpg";
import imgPerson2 from "../../assets/images/person_2-min.jpg";
import imgPerson3 from "../../assets/images/person_3-min.jpg";
import imgPerson4 from "../../assets/images/person_4-min.jpg";

function Testimonialdata() {
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/customer");
        const testimonials = res.data.map((testimonial, index) => ({
          ...testimonial,
          image: [imgPerson1, imgPerson2, imgPerson3, imgPerson4][index % 4], // Gán hình ảnh tương ứng
        }));
        setTestimonialsData(testimonials);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhận xét:", error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonialsData.length > 0) {
      const slider = tns({
        container: ".testimonial-slider",
        items: 1,
        slideBy: 1,
        autoplay: false,
        controls: true, // Đảm bảo có controls
        nav: false, // Tắt nav nếu không cần
        speed: 200,
        prevButton: ".prev-2",
        nextButton: ".next-2",
        responsive: {
          640: { items: 1 },
          768: { items: 2 },
          1024: { items: 3 },
        },
      });

      return () => {
        slider.destroy();
      };
    }
  }, [testimonialsData]);

  return (
    <div className="section sec-testimonials">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="font-weight-bold heading text-primary mb-4 mb-md-0">
              Nhận xét của khách hàng
            </h2>
          </div>
          <div className="col-md-6 text-md-end">
            <div id="testimonial-nav">
              <span className="prev-2" data-controls="prev">
                &#9664; {/* Mũi tên trái */}
              </span>
              <span className="next-2" data-controls="next">
                &#9654; {/* Mũi tên phải */}
              </span>
            </div>
          </div>
        </div>

        <div className="testimonial-slider-wrap">
          <div className="testimonial-slider">
            {testimonialsData.length > 0 ? (
              testimonialsData.map((testimonial, index) => (
                <div className="item" key={index}>
                  <div className="testimonial">
                    <img
                      src={testimonial.image}
                      className="img-fluid rounded-circle w-25 mb-4"
                      alt={`Hình ảnh của ${testimonial.name}`}
                    />
                    <div className="rate">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <span
                            key={i}
                            className="icon-star text-warning"
                          ></span>
                        ))}
                    </div>
                    <h3 className="h5 text-primary mb-4">{testimonial.name}</h3>
                    <blockquote>
                      <p>{`“${testimonial.quotes}”`}</p>
                    </blockquote>
                    <p className="text-black-50">{testimonial.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có dữ liệu để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonialdata;
