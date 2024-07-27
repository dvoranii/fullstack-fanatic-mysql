export interface Step {
  title: string;
  content: string;
  component?: string; // Made optional for now
}

export interface BlogContent {
  [key: number]: {
    steps: Step[];
  };
}

export const blogContent: BlogContent = {
  1: {
    steps: [
      {
        title: "Step 1: Introduction to React",
        content: "Content for the introduction to React...",
        // component: "Component1", // Uncomment if needed in the future
      },
      {
        title: "Step 2: Understanding JSX",
        content: "Content for understanding JSX...",
        // component: "Component2", // Uncomment if needed in the future
      },
    ],
  },
  2: {
    steps: [
      {
        title: "Step 1: What is Node.js?",
        content: "Content for understanding what Node.js is...",
        // component: "Component1", // Uncomment if needed in the future
      },
      {
        title: "Step 2: Node.js Architecture",
        content: "Content for understanding Node.js architecture...",
        // component: "Component2", // Uncomment if needed in the future
      },
    ],
  },
  3: {
    steps: [
      {
        title: "Step 1: Basics of CSS",
        content: "Content for understanding CSS basics...",
        // component: "Component1", // Uncomment if needed in the future
      },
      {
        title: "Step 2: Advanced CSS Techniques",
        content: "Content for understanding advanced CSS techniques...",
        // component: "Component2", // Uncomment if needed in the future
      },
    ],
  },
  4: {
    steps: [
      {
        title: "Step 1: Getting Started with TypeScript",
        content: "Content for getting started with TypeScript...",
        // component: "Component1", // Uncomment if needed in the future
      },
      {
        title: "Step 2: TypeScript Basics",
        content: "Content for understanding TypeScript basics...",
        // component: "Component2", // Uncomment if needed in the future
      },
    ],
  },
};
