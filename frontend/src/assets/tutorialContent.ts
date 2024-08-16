import tutorial_1_thumbnail from "../assets/images/tutorials/deployment-thumbnail.png";
import tutorial_2_thumbnail from "../assets/images/tutorials/csrf-thumbnail.png";
import { TutorialContentItem } from "../types/TutorialContentItem";

export const tutorialContent: TutorialContentItem[] = [
  {
    id: 1,
    title: "Server Setup and Deployment",
    created_at: "2024-08-16",
    steps: [
      {
        title: "Step 1: Setup server",
        content: "Content for setting up the server...", // Replace with React components if needed
      },
      {
        title: "Step 2: Deploy application",
        content: "Content for deploying the application...",
      },
    ],
    image: tutorial_1_thumbnail,
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
  },
];
