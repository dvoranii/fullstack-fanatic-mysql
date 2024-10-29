import tutorial_1_thumbnail from "./images/tutorials/deployment-thumbnail.png";
import tutorial_2_thumbnail from "./images/tutorials/csrf-thumbnail.png";
import tutorial_3_thumbnail from "./images/tutorials/network-request.png";
import tutorial_4_thumbnail from "./images/tutorials/webappsecurity-thumbnail.png";
import tutorial_5_thumbnail from "./images/tutorials/forms-thumbnail.png";
import tutorial_6_thumbnail from "./images/tutorials/dns-thumbnail.png";
import tutorial_7_thumbnail from "./images/tutorials/frontend-thumbnail.png";
import tutorial_8_thumbnail from "./images/tutorials/web-performance-thumbnail.png";
import tutorial_9_thumbnail from "./images/tutorials/responsive-design-thumbnail.png";
import { TutorialContentItem } from "../types/Tutorial/Tutorial";

export const tutorialContent: TutorialContentItem[] = [
  {
    id: 1,
    title: "Server Setup and Deployment",
    created_at: "2024-08-16",
    steps: [
      {
        title: "Step 1: Setup server",
        content: "Content for setting up the server...",
      },
      {
        title: "Step 2: Deploy application",
        content: "Content for deploying the application...",
      },
    ],
    image: tutorial_1_thumbnail,
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    difficulty: "beginner",
    description: "Learn how to set up and deploy your server step by step.",
  },
  {
    id: 2,
    title: "Understanding CSRF",
    created_at: "2024-08-15",
    steps: [
      {
        title: "Step 1: Understanding CSRF",
        content: "Content for understanding CSRF...",
      },
      {
        title: "Step 2: Implementing tokens",
        content: "Content for implementing tokens...",
      },
    ],
    image: tutorial_2_thumbnail,
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    difficulty: "beginner",
    description:
      "Master CSRF protection techniques to secure your web applications.",
  },
  {
    id: 3,
    title: "Javascript and Network Requests: A Comprehensive Breakdown",
    created_at: "2024-10-10",
    steps: [
      {
        title: "Step 1: GET Requests",
        content: "Content for JS & Network requests...",
      },
      {
        title: "Step 2: POST Request",
        content: "Content forJS & Network requests...",
      },
    ],
    image: tutorial_3_thumbnail,
    isPremium: true,
    premiumLevel: "starter",
    availableForPurchase: true,
    accessLevel: "premium",
    price: 3.5,
    difficulty: "intermediate",
    description:
      "Learn how JavaScript interacts with APIs using GET and POST requests.",
  },
  {
    id: 4,
    title: "Web Application Security 101",
    created_at: "2024-10-12",
    steps: [
      {
        title: "Step 1: Understanding Web App Security with OWASP",
        content: "Content for web app security...",
      },
      {
        title: "Step 2: Building our app",
        content: "Content for web app security...",
      },
    ],
    image: tutorial_4_thumbnail,
    isPremium: true,
    premiumLevel: "premium",
    availableForPurchase: true,
    accessLevel: "premium",
    price: 5.0,
    difficulty: "advanced",
    description:
      "Learn the fundamentals of web application security, including OWASP guidelines and building secure apps.",
  },
  {
    id: 5,
    title: "Forms in Depth",
    created_at: "2024-10-13",
    steps: [
      {
        title: "Step 1: Introduction",
        content: "Content for Forms in Depth...",
      },
      {
        title: "Step 2: Building our app",
        content: "Content for Forms in Depth ...",
      },
    ],
    image: tutorial_5_thumbnail,
    isPremium: true,

    premiumLevel: "casual pro",
    availableForPurchase: true,
    accessLevel: "premium",
    price: 5,
    difficulty: "intermediate",
    description:
      "Dive deep into form handling in web development, from validation to security best practices.",
  },
  {
    id: 6,
    title: "DNS 101: Let's deply and configure an app!",
    created_at: "2024-10-13",
    steps: [
      {
        title: "Step 1: Introduction",
        content: "Content for DNS 101...",
      },
      {
        title: "Step 2: Choosing a provider",
        content: "Content for DNS 101...",
      },
    ],
    image: tutorial_6_thumbnail,
    isPremium: true,
    premiumLevel: "starter",
    availableForPurchase: true,
    accessLevel: "premium",
    price: 3.5,
    difficulty: "intermediate",
    description:
      "Master DNS configuration and deploy your application with ease, ensuring optimal performance.",
  },
  {
    id: 7,
    title: "Frontend Development Basics",
    created_at: "2024-10-15",
    steps: [
      {
        title: "Step 1: Setting up HTML and CSS",
        content: "Content for setting up HTML and CSS...",
      },
      {
        title: "Step 2: Adding JavaScript",
        content: "Content for adding JavaScript to your project...",
      },
    ],
    image: tutorial_7_thumbnail,
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    difficulty: "beginner",
    description:
      "Get started with frontend development, building projects using HTML, CSS, and JavaScript.",
  },
  {
    id: 8,
    title: "Improving Web Performance",
    created_at: "2024-10-15",
    steps: [
      {
        title: "Step 1: Optimizing images and resources",
        content: "Content for optimizing images and resources...",
      },
      {
        title: "Step 2: Reducing load times",
        content: "Content for reducing load times on your site...",
      },
    ],
    image: tutorial_8_thumbnail,
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    difficulty: "beginner",
    description:
      "Improve your website’s performance by optimizing images, reducing load times, and enhancing user experience.",
  },
  {
    id: 9,
    title: "Mobile Responsiveness: The Optimal Way",
    created_at: "2024-10-15",
    steps: [
      {
        title: "Step 1: Understanding the main css functions and attributes",
        content: "Content for optimizing images and resources...",
      },
      {
        title: "Step 2: Media Queries",
        content: "Content for reducing load times on your site...",
      },
    ],
    image: tutorial_9_thumbnail,
    isPremium: false,
    availableForPurchase: false,
    accessLevel: "free",
    difficulty: "intermediate",
    description:
      "Make your web applications fully responsive with CSS techniques and media queries.",
  },
];
