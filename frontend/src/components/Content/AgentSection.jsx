import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/flaticon/font/flaticon.css";
import "aos/dist/aos.css";
import "../../assets/css/style.css";
import "../../assets/css/tiny-slider.css";
import person1 from "../../assets/images/person_1-min.jpg";
import person2 from "../../assets/images/person_2-min.jpg";
import person3 from "../../assets/images/person_3-min.jpg";

function AgentsSection() {
  const agents = [
    {
      name: "James Doe",
      role: "Real Estate Agent",
      image: person1,
    },
    {
      name: "Jean Smith",
      role: "Real Estate Agent",
      image: person2,
    },
    {
      name: "Alicia Huston",
      role: "Real Estate Agent",
      image: person3,
    },
  ];

  return (
    <div className="section section-5 bg-light">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6 mb-5">
            <h2 className="font-weight-bold heading text-primary mb-4">
              Đại lý bất động sản
            </h2>
            {/* <p className="text-black-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              enim pariatur similique debitis vel nisi qui reprehenderit totam?
              Quod maiores.
            </p> */}
          </div>
        </div>
        <div className="row">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
            >
              <div className="h-100 person">
                <img
                  src={agent.image}
                  alt={`Image of ${agent.name}`}
                  className="img-fluid"
                />
                <div className="person-contents">
                  <h2 className="mb-0">
                    <a href="#">{agent.name}</a>
                  </h2>
                  <span className="meta d-block mb-3">{agent.role}</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facere officiis inventore cumque tenetur laboriosam, minus
                    culpa doloremque odio, neque molestias?
                  </p>
                  <ul className="social list-unstyled list-inline dark-hover">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="icon-twitter"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="icon-facebook"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="icon-linkedin"></span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="icon-instagram"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentsSection;
