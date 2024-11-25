import {
  ProductsAndServicesWrapperOuter,
  ProductsAndServicesWrapperInner,
  CardWrapper,
  Card,
  CardList,
} from "./ProductsAndServices.styled";
import TutorialIcon from "../../../assets/images/tutorial-icon-home.svg";
import BlogIcon from "../../../assets/images/blog-icon-home.svg";
import ConsultIcon from "../../../assets/images/consult-icon-home.svg";
import Title from "../../../components/Title/Title";

const ProductsAndServices: React.FC = () => {
  return (
    <>
      <Title textContent="Products & Services" pseudoWidth="170px" />
      <ProductsAndServicesWrapperOuter>
        <ProductsAndServicesWrapperInner>
          <CardWrapper>
            <Card>
              <h3>Tutorials</h3>
              <CardList>
                <li>
                  <span>
                    <b>Multi-level Tutorials:</b> Beginner, Intermediate, and
                    Advanced levels available.
                  </span>
                </li>

                <li>
                  <span>
                    <b>Comprehensive Coverage:</b> JavaScript, React, HTML, CSS,
                    and more.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Visual Indicators:</b> Easily identify the difficulty
                    level of each tutorial with visual markers.
                  </span>
                </li>
              </CardList>
            </Card>
            <img src={TutorialIcon} alt="" />
          </CardWrapper>
          <CardWrapper>
            <Card>
              <h3>Blog Posts</h3>
              <CardList>
                <li>
                  <span>
                    <b>Latest Topics:</b> Web Development, Cybersecurity, AI,
                    and IT trends.
                  </span>
                </li>

                <li>
                  <span>
                    <b>Expert Advice:</b> Tips on project selection, career
                    development, and more.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Opinionated Insights:</b> Personalized advice on useful
                    projects and portfolio building.
                  </span>
                </li>
              </CardList>
            </Card>
            <img src={BlogIcon} alt="" />
          </CardWrapper>
          <CardWrapper>
            <Card>
              <h3>Consultations</h3>
              <CardList>
                <li>
                  <span>
                    <b>Flexible Booking:</b> Choose from 30 min, 1 hour, or
                    3-hour sessions.
                  </span>
                </li>

                <li>
                  <span>
                    <b>Tailored Support:</b> Assistance with code, career
                    questions, and roadmap development
                  </span>
                </li>
                <li>
                  <span>
                    <b>Custom Curriculums:</b> Organize saved blogs and
                    tutorials into personalized learning paths.
                  </span>
                </li>
              </CardList>
            </Card>
            <img src={ConsultIcon} className="consult-icon" alt="" />
          </CardWrapper>
        </ProductsAndServicesWrapperInner>
      </ProductsAndServicesWrapperOuter>
    </>
  );
};

export default ProductsAndServices;
