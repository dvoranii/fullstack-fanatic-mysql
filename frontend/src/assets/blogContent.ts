import { BlogContentItem } from "../types/Blog/BlogContentItem";

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
    image: "path-to-image", // Add image paths
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
    image: "path-to-image",
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
    image: "path-to-image",
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
    image: "path-to-image",
  },
];
