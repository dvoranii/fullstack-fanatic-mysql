import { BlogContentItem } from "../types/Blog/Blog";

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
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/React-icon.svg.png",
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    tags: ["frontend", "react", "javascript"],
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
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/node-logo.png",
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    tags: ["backend", "nodejs", "javascript"],
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
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/css-logo.png",
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    tags: ["frontend", "css", "styling"],
  },
  {
    id: 4,
    title: "Getting Started with TypeScript",
    created_at: "2024-07-26 19:43:37",
    steps: [
      {
        title: "Step 1: typescript step 1",
        content: "Content for TS...",
      },
      {
        title: "Step 2: typescript step 2",
        content: "Content for TS...",
      },
    ],
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/Typescript-logo.png",
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    tags: ["typescript", "programming", "tools"],
  },
  {
    id: 5,
    title: "Mastering GraphQL in Modern Applications",
    created_at: "2024-09-01",
    steps: [
      { title: "Step 1: Introduction to GraphQL", content: "..." },
      { title: "Step 2: Setting up a GraphQL Server", content: "..." },
    ],
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/GraphQL_Logo.png",
    isPremium: true,
    availableForPurchase: true,
    price: 2.5,
    accessLevel: "premium",
    tags: ["graphql", "api", "backend"],
  },
  {
    id: 6,
    title: "Building Scalable Microservices with Kubernetes",
    created_at: "2024-09-05",
    steps: [
      { title: "Step 1: Understanding Microservices", content: "..." },
      { title: "Step 2: Deploying with Kubernetes", content: "..." },
    ],
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/kubernetes-logo.png",
    isPremium: true,
    availableForPurchase: true,
    price: 2.5,
    accessLevel: "premium",
    tags: ["kubernetes", "devops", "microservices"],
  },
  {
    id: 7,
    title: "WebAssembly: Is it even worth it?",
    created_at: "2024-09-10",
    steps: [
      { title: "Step 1: What is WebAssembly?", content: "..." },
      { title: "Step 2: Using WebAssembly in Web Apps", content: "..." },
    ],
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/WebAssembly_Logo.svg",
    isPremium: true,
    availableForPurchase: true,
    price: 2.5,
    accessLevel: "premium",
    tags: ["webassembly", "performance", "web"],
  },
  {
    id: 8,
    title: "Implementing Serverless Architecture with AWS Lambda",
    created_at: "2024-09-15",
    steps: [
      { title: "Step 1: Understanding Serverless", content: "..." },
      { title: "Step 2: Building with AWS Lambda", content: "..." },
    ],
    image:
      "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/blogs/aws-logo.webp",
    isPremium: true,
    availableForPurchase: true,
    price: 2.5,
    accessLevel: "premium",
    tags: ["aws", "serverless", "cloud"],
  },
];
