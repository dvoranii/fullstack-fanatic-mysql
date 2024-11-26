import {
  ProductsAndServicesWrapperOuter,
  ProductsAndServicesWrapperInner,
  CardWrapper,
  Card,
  CardList,
  CardImagesWrapper,
  ProductsAndServiceTitleWrapper,
  ProductsAndServiceTitle,
  ProductsAndServicesBottomImgWrapper,
} from "./ProductsAndServices.styled";
import TutorialIcon from "../../../assets/images/tutorial-icon-home.svg";
import BlogIcon from "../../../assets/images/blog-icon-home.svg";
import ConsultIcon from "../../../assets/images/consult-icon-home.svg";
import RatingsCardImage from "../../../assets/images/ratings-card-image.svg";
import BlogsCardImage from "../../../assets/images/blogs-card-image.svg";
import ConsultCardImage from "../../../assets/images/consult-card-image.svg";
import ProductsAndServicesBottomImg from "../../../assets/images/products-and-services-bottom-img.svg";

const ProductsAndServices: React.FC = () => {
  return (
    <>
      <ProductsAndServiceTitleWrapper>
        <ProductsAndServiceTitle>Products & Services</ProductsAndServiceTitle>
      </ProductsAndServiceTitleWrapper>
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
                    <b>Visual Indicators:</b> Identify the difficulty level of
                    each tutorial with visual markers.
                  </span>
                </li>
              </CardList>
              <CardImagesWrapper>
                <img
                  src={RatingsCardImage}
                  className="ratings-img"
                  alt="ratings stars image"
                  loading="lazy"
                />
              </CardImagesWrapper>
            </Card>
            <img
              src={TutorialIcon}
              className="top-icon"
              alt="tutorial card icon"
              loading="lazy"
            />
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
              <CardImagesWrapper>
                <img
                  src={BlogsCardImage}
                  className="blogs-img"
                  alt="Blogs Card Image"
                  loading="lazy"
                />
              </CardImagesWrapper>
            </Card>
            <img
              src={BlogIcon}
              className="top-icon"
              alt="Blog card Icon"
              loading="lazy"
            />
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
                    questions, and roadmaps.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Custom Curriculums:</b> Organize blogs and tutorials into
                    learning paths.
                  </span>
                </li>
              </CardList>
              <CardImagesWrapper>
                <img src={ConsultCardImage} alt="Consultation Image" />
              </CardImagesWrapper>
            </Card>
            <img
              src={ConsultIcon}
              className="top-icon consult-icon"
              alt="Consultation Icon"
              loading="lazy"
            />
          </CardWrapper>
        </ProductsAndServicesWrapperInner>
      </ProductsAndServicesWrapperOuter>
      <ProductsAndServicesBottomImgWrapper>
        <img
          src={ProductsAndServicesBottomImg}
          alt="Products and Services banner image"
          loading="lazy"
        />
      </ProductsAndServicesBottomImgWrapper>
    </>
  );
};

export default ProductsAndServices;
