export interface Step {
  title: string;
  content: string;
  component?: string; // Made optional for now
}

export interface TutorialContent {
  [key: number]: {
    steps: Step[];
  };
}

export const tutorialContent: TutorialContent = {
  1: {
    steps: [
      {
        title: "Step 1: Setup server",
        content: "Content for setting up the server...",
        // component: "Component1", // Uncomment if needed in the future
      },
      {
        title: "Step 2: Deploy application",
        content: "Content for deploying the application...",
        // component: "Component2", // Uncomment if needed in the future
      },
    ],
  },
  2: {
    steps: [
      {
        title: "Step 1: Understanding CSRF",
        content: "Content for understanding CSRF...",
        // component: "Component1", // Uncomment if needed in the future
      },
      {
        title: "Step 2: Implementing tokens",
        content: "Content for implementing tokens...",
        // component: "Component2", // Uncomment if needed in the future
      },
    ],
  },
};
