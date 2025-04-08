import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect, useMemo } from "react";
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
  StyledSearchBar
} from "./BlogsPage.styled";

import { CartItem } from "../../types/CartItem";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";

import { UserContext } from "../../context/UserContext";
import { blogContent } from "../../assets/blogContent";
import { mapBlogToCartItem } from "../../utils/cartUtils";

import { TagFilterDropdown } from "../../components/TagFilterDropdown/TagFilterDropdown";
import { filterTags } from "../../assets/filterTags"; 
import { FilterTag } from "../../types/FilterTag";

const BlogsPage: React.FC = () => {
  const {
    profile,
    favouriteBlogs = [],
    toggleFavourite = () => {},
    cartItems = [],
    addItemToCart = () => {},
    purchasedItems = [],
  } = useContext(UserContext) || {};

  const [visibleBlogs, setVisibleBlogs] = useState<number>(4);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"AND" | "OR">("OR");

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogContent.forEach(blog => {
      blog.tags.forEach(tagId => {
        counts[tagId] = (counts[tagId] || 0) + 1;
      })
    })
    return counts;
  },[]);

  const availableTags = useMemo(() => {
    const allTagIds = Array.from(new Set(blogContent.flatMap(b=> b.tags)));
    return allTagIds.map(tagId=> filterTags[tagId]).filter((tag): tag is FilterTag => !!tag)
  },[])


  const filteredBlogs = useMemo(() => {
    return blogContent.filter(blog => {
      const searchMatch = 
        blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
  
      const tagMatch = selectedTags.length === 0 || 
        (filterMode === "AND"
          ? selectedTags.every(tag => blog.tags.includes(tag))
          : selectedTags.some(tag => blog.tags.includes(tag)));
  
      return searchMatch && tagMatch;
    });
  }, [searchText, selectedTags, filterMode]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };
  
  const handleClearAllTags = () => {
    setSelectedTags([]);
  };
  

  useEffect(() => {
    setVisibleBlogs(4);
  }, [searchText, selectedTags, filterMode]);

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };


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
    <>
      <Helmet>
        <title>Blogs - Full Stack Fanatic</title>
        <meta name="description" content="Full Stack Fanatic Blogs Page." />
      </Helmet>

      <BlogPageWrapper>
        <Title textContent="Blogs" />
        <BlogList>
          <StyledSearchBar
            onChange={(value) => setSearchText(value)}
          />
             <TagFilterDropdown
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onClearAll={handleClearAllTags}
              filterMode={filterMode}
              onFilterModeChange={setFilterMode}
            />

          <img
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/SquaresAndTriangles.svg"
            className="squares-and-triangles"
            alt=""
          />

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
                      <img
                        src={blog.image}
                        alt={blog.title}
                        title={blog.title}
                      />
                    </BlogImgWrapper>
                  </PremiumBlogThumbnailWrapperOuter>
                ) : (
                  <BlogImgWrapper>
                    <img src={blog.image} alt={blog.title} title={blog.title} />
                  </BlogImgWrapper>
                )}
                <BlogContent
                  to={isPremiumLocked ? "#" : `/blog/${blog.id}`}
                  style={{
                    cursor: isPremiumLocked ? "not-allowed" : "pointer",
                  }}
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
                        <img
                          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/unlocked.png"
                          alt="Unlocked"
                        />
                      ) : (
                        <img
                          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/lock.png"
                          alt="Locked"
                        />
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
    </>
  );
};

export default BlogsPage;
