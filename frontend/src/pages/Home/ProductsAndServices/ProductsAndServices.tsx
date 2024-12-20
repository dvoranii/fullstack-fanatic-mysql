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
  CardLink,
  BgSquaresAndTrianglesWrapper,
} from "./ProductsAndServices.styled";
import TutorialIcon from "/assets/images/home/tutorial-icon-home.svg";
import BlogIcon from "/assets/images/home/blog-icon-home.svg";
import ConsultIcon from "/assets/images/home/consult-icon-home.svg";
import RatingsCardImage from "/assets/images/home/ratings-card-image.svg";
import BlogsCardImage from "/assets/images/home/blogs-card-image.svg";
import ConsultCardImage from "/assets/images/home/consult-card-image.svg";
import ProductsAndServicesBottomImg from "/assets/images/home/products-and-services-bottom-img.svg";
import BgSquaresAndTriangle from "/assets/images/bg-images/SquaresAndTriangles.svg";

const ProductsAndServices: React.FC = () => {
  return (
    <>
      <ProductsAndServiceTitleWrapper>
        <ProductsAndServiceTitle>Products & Services</ProductsAndServiceTitle>
      </ProductsAndServiceTitleWrapper>
      <ProductsAndServicesWrapperOuter>
        <BgSquaresAndTrianglesWrapper>
          <img
            className="bg-squares"
            src={BgSquaresAndTriangle}
            alt=""
            width="260"
            height="auto"
          />
        </BgSquaresAndTrianglesWrapper>

        <ProductsAndServicesWrapperInner>
          <CardWrapper className="card">
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
                  width="360"
                  height="80"
                />
              </CardImagesWrapper>

              <CardLink to="/tutorials">View Tutorials</CardLink>
            </Card>
            <img
              src={TutorialIcon}
              className="top-icon"
              alt="tutorial card icon"
              loading="lazy"
              width="70"
              height="78"
            />
          </CardWrapper>
          <CardWrapper className="card">
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
                  width="360"
                  height="125"
                />
              </CardImagesWrapper>
              <CardLink to="/blogs">View Blogs</CardLink>
            </Card>
            <img
              src={BlogIcon}
              className="top-icon"
              alt="Blog card Icon"
              loading="lazy"
              width="70"
              height="73"
            />
          </CardWrapper>
          <CardWrapper className="card consult-card">
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
                <img
                  src={ConsultCardImage}
                  alt="Consultation Image"
                  width="360"
                  height="128"
                />
              </CardImagesWrapper>
              <CardLink to="/plans-and-pricing#consultation-section">
                Book Consultation
              </CardLink>
            </Card>
            <img
              src={ConsultIcon}
              className="top-icon consult-icon"
              alt="Consultation Icon"
              loading="lazy"
              width="90"
              height="85"
            />
          </CardWrapper>
        </ProductsAndServicesWrapperInner>
      </ProductsAndServicesWrapperOuter>
      <ProductsAndServicesBottomImgWrapper>
        <img
          src={ProductsAndServicesBottomImg}
          alt="Products and Services banner image"
          loading="lazy"
          width="1920"
          height="1080"
        />
      </ProductsAndServicesBottomImgWrapper>
    </>
  );
};

export default ProductsAndServices;
