import { Blog } from "../types/Blog/Blog";
import { CartItem } from "../types/CartItem";
import { Tutorial } from "../types/Tutorial/Tutorial";

export const mapBlogToCartItem = (blog: Blog): CartItem => ({
  id: blog.id,
  title: blog.title,
  created_at: blog.created_at,
  price: blog.price || 0,
  image: blog.image,
  isPremium: blog.isPremium,
  premiumLevel: blog.premiumLevel,
  availableForPurchase: blog.availableForPurchase,
  accessLevel: blog.accessLevel,
  type: "blog",
  isPurchased: false,
});

export const mapTutorialToCartItem = (tutorial: Tutorial): CartItem => ({
  id: tutorial.id,
  title: tutorial.title,
  created_at: tutorial.created_at,
  price: tutorial.price || 0,
  description: tutorial.description,
  image: tutorial.image,
  isPremium: tutorial.isPremium,
  premiumLevel: tutorial.premiumLevel,
  availableForPurchase: tutorial.availableForPurchase,
  accessLevel: tutorial.accessLevel,
  type: "tutorial",
  isPurchased: false,
});
