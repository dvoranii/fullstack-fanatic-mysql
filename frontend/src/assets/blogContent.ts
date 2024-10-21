import { BlogContentItem } from "../types/Blog/BlogContentItem";
import blog_thumbnail_1 from "../assets/images/blogs/React-icon.svg.png";
import blog_thumbnail_2 from "../assets/images/blogs/node-logo.png";
import blog_thumbnail_3 from "../assets/images/blogs/css-logo.png";
import blog_thumbnail_4 from "../assets/images/blogs/Typescript-logo.png";
import blog_thumbnail_5 from "../assets/images/blogs/GraphQL_Logo.png";
import blog_thumbnail_6 from "../assets/images/blogs/kubernetes-logo.png";
import blog_thumbnail_7 from "../assets/images/blogs/WebAssembly_Logo.svg";
import blog_thumbnail_8 from "../assets/images/blogs/aws-logo.webp";

export const blogContent: BlogContentItem[] = [
  {
    id: 1,
    title: "Introduction to React",
    created_at: "2024-08-16",
    steps: [
      {
        title: "Step 1: Introduction to React",
        content: "Content for the introduction to React...",
      },
      {
        title: "Step 2: Understanding JSX",
        content: "Content for understanding JSX...",
      },
    ],
    image: blog_thumbnail_1,
    isPremium: false,
  },
  {
    id: 2,
    title: "What is Node.js?",
    created_at: "2024-08-15",
    steps: [
      {
        title: "Step 1: What is Node.js?",
        content: "Content for understanding what Node.js is...",
      },
      {
        title: "Step 2: Node.js Architecture",
        content: "Content for understanding Node.js architecture...",
      },
    ],
    image: blog_thumbnail_2,
    isPremium: false,
  },
  {
    id: 3,
    title: "Advanced CSS Techniques",
    created_at: "2024-07-26 19:43:37",
    steps: [
      {
        title: "Step 1: Advanced css step 1",
        content: "Content for advanced css techniques is...",
      },
      {
        title: "Step 2: the second step",
        content: "Content for advanced css techniques...",
      },
    ],
    image: blog_thumbnail_3,
    isPremium: false,
  },
  {
    id: 4,
    title: "Getting Started with TypeScript",
    created_at: "2024-07-26 19:43:37",
    steps: [
      {
        title: "Step 1: typescript step 1",
        content: "Content forTS...",
      },
      {
        title: "Step 2: typescript step 2",
        content: "Content for TS...",
      },
    ],
    image: blog_thumbnail_4,
    isPremium: false,
  },
  {
    id: 5,
    title: "Mastering GraphQL in Modern Applications",
    created_at: "2024-09-01",
    steps: [
      { title: "Step 1: Introduction to GraphQL", content: "..." },
      { title: "Step 2: Setting up a GraphQL Server", content: "..." },
    ],
    image: blog_thumbnail_5,
    isPremium: true,
  },
  {
    id: 6,
    title: "Building Scalable Microservices with Kubernetes",
    created_at: "2024-09-05",
    steps: [
      { title: "Step 1: Understanding Microservices", content: "..." },
      { title: "Step 2: Deploying with Kubernetes", content: "..." },
    ],
    image: blog_thumbnail_6,
    isPremium: true,
  },
  {
    id: 7,
    title: "WebAssembly: Is it even worth it?",
    created_at: "2024-09-10",
    steps: [
      { title: "Step 1: What is WebAssembly?", content: "..." },
      { title: "Step 2: Using WebAssembly in Web Apps", content: "..." },
    ],
    image: blog_thumbnail_7,
    isPremium: true,
  },
  {
    id: 8,
    title: "Implementing Serverless Architecture with AWS Lambda",
    created_at: "2024-09-15",
    steps: [
      { title: "Step 1: Understanding Serverless", content: "..." },
      { title: "Step 2: Building with AWS Lambda", content: "..." },
    ],
    image: blog_thumbnail_8,
    isPremium: true,
  },
];
