import { useContext, useState, useEffect } from "react";
import Title from "../../components/Title/Title";
import {
  BlogList,
  BlogItem,
  BlogContent,
  BlogActions,
  BlogImgWrapper,
  FreeBadge,
  PremiumBadge,
  SeeMoreButtonWrapper,
  BlogPageWrapper,
  BottomButtonsWrapper,
  PremiumBlogThumbnailWrapperOuter,
} from "./BlogsPage.styled";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { UserContext } from "../../context/UserContext";
import { blogContent } from "../../assets/blogContent";
import PremiumLockImg from "../../assets/images/lock.png";
import PremiumUnlockImg from "../../assets/images/unlocked.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import SquaresAndTriangles from "../../assets/images/SquaresAndTriangles.svg";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import { CartItem } from "../../types/CartItem";
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { mapBlogToCartItem } from "../../utils/cartUtils";

const BlogsPage: React.FC = () => {
  const {
    profile,
    favouriteBlogs = [],
    toggleFavourite = () => {},
    cartItems = [],
    addItemToCart = () => {},
    purchasedItems = [],
  } = useContext(UserContext) || {};

  console.log(purchasedItems);

  const [visibleBlogs, setVisibleBlogs] = useState<number>(4);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setVisibleBlogs(4);
  }, [searchText]);

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };

  const filteredBlogs = blogContent.filter((blog) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const canAccessBlog = (blogId: number) => {
    return (
      purchasedItems.some(
        (item) => item.product_id === blogId && item.product_type === "blog"
      ) ||
      profile?.isPremium ||
      !blogContent.find((b) => b.id === blogId)?.isPremium
    );
  };

  const isItemInCart = (id: number) => {
    return cartItems.some((item) => item.id === id);
  };

  const isPurchased = (id: number): boolean => {
    return purchasedItems.some(
      (item) => item.product_id === id && item.product_type === "blog"
    );
  };

  return (
    <BlogPageWrapper>
      <Title textContent="Blogs" />
      <BlogList>
        <SearchBar paddingLeft="0" onChange={(value) => setSearchText(value)} />
        <img
          src={SquaresAndTriangles}
          className="squares-and-triangles"
          alt=""
        />
        <div className="block-1"></div>
        {filteredBlogs.slice(0, visibleBlogs).map((blog) => {
          const isPremiumLocked = blog.isPremium && !canAccessBlog(blog.id);
          const hasAccess = canAccessBlog(blog.id);
          const alreadyInCart = isItemInCart(blog.id);
          const isPurchasedItem = isPurchased(blog.id);

          const cartItem: CartItem = mapBlogToCartItem(blog);
          cartItem.isPurchased = isPurchasedItem;

          return (
            <BlogItem key={blog.id}>
              {isPremiumLocked ? (
                <PremiumBlogThumbnailWrapperOuter>
                  <BlogImgWrapper>
                    <img src={blog.image} alt={blog.title} title={blog.title} />
                  </BlogImgWrapper>
                </PremiumBlogThumbnailWrapperOuter>
              ) : (
                <BlogImgWrapper>
                  <img src={blog.image} alt={blog.title} title={blog.title} />
                </BlogImgWrapper>
              )}
              <BlogContent
                to={isPremiumLocked ? "#" : `/blog/${blog.id}`}
                style={{ cursor: isPremiumLocked ? "not-allowed" : "pointer" }}
                onClick={(e) => {
                  if (isPremiumLocked) e.preventDefault();
                }}
              >
                <h2>{blog.title}</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aliquam ab, voluptatibus quia ea cum adipisci fuga
                  exercitationem, voluptatum eos nobis esse odio molestias
                  distinctio quibusdam! Optio veniam quae repellat itaque.
                </p>
              </BlogContent>
              <BlogActions>
                {blog.isPremium === false ? (
                  <FreeBadge>
                    <p>FREE</p>
                  </FreeBadge>
                ) : (
                  <PremiumBadge hasAccess={hasAccess}>
                    <p>Premium</p>
                    {canAccessBlog(blog.id) ? (
                      <img src={PremiumUnlockImg} alt="Unlocked" />
                    ) : (
                      <img src={PremiumLockImg} alt="Locked" />
                    )}
                  </PremiumBadge>
                )}

                <BottomButtonsWrapper>
                  {blog.availableForPurchase &&
                    profile &&
                    !isPurchased(blog.id) && (
                      <AddToCartButton
                        item={cartItem}
                        alreadyInCart={alreadyInCart}
                        isAccessible={hasAccess && blog.isPremium}
                        onAddToCart={addItemToCart}
                      />
                    )}
                  {profile && (
                    <FavouriteButton
                      isFavourited={favouriteBlogs.some(
                        (favBlog) => favBlog.id === blog.id
                      )}
                      onClick={() => toggleFavourite(blog.id, "blog")}
                      altText="Blog Favourite Button"
                      isDisabled={isPremiumLocked}
                    />
                  )}
                </BottomButtonsWrapper>
              </BlogActions>
            </BlogItem>
          );
        })}
      </BlogList>
      {visibleBlogs < filteredBlogs.length && (
        <SeeMoreButtonWrapper>
          <button onClick={handleSeeMore}>See More Blogs</button>
        </SeeMoreButtonWrapper>
      )}
    </BlogPageWrapper>
  );
};

export default BlogsPage;
