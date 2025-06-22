import { FilterTag } from "../types/FilterTag";

export const filterTags: Record<string, FilterTag> = {
  // Domain Tags
  "frontend": { 
    id: "frontend", 
    label: "Frontend", 
    color: "#61DAFB", 
    category: "domain",
    description: "Frontend development topics"
  },
  "backend": { 
    id: "backend", 
    label: "Backend", 
    color: "#6DB33F", 
    category: "domain",
    description: "Server-side and backend concepts"
  },
  "devops": { 
    id: "devops", 
    label: "DevOps", 
    color: "#2496ED", 
    category: "domain",
    description: "Development operations and infrastructure"
  },
  "web": { 
    id: "web", 
    label: "Web", 
    color: "#4285F4", 
    category: "domain",
    description: "General web development"
  },

  // Security Tags
  "security": { 
    id: "security", 
    label: "Security", 
    color: "#FF5252", 
    category: "security",
    description: "Web security principles"
  },
  "csrf": { 
    id: "csrf", 
    label: "CSRF", 
    color: "#FF6B6B", 
    category: "security",
    description: "Cross-Site Request Forgery protection"
  },
  "owasp": { 
    id: "owasp", 
    label: "OWASP", 
    color: "#000000", 
    category: "security",
    description: "OWASP security standards"
  },

  // Level Tags
  "beginner": { 
    id: "beginner", 
    label: "Beginner", 
    color: "#2ECC71", 
    category: "level",
    description: "Entry-level tutorials"
  },
  "intermediate": { 
    id: "intermediate", 
    label: "Intermediate", 
    color: "#F39C12", 
    category: "level",
    description: "Intermediate skill level"
  },
  "advanced": { 
    id: "advanced", 
    label: "Advanced", 
    color: "#E74C3C", 
    category: "level",
    description: "Advanced concepts"
  },

  // Price
  "free": {
    id: "free",
    label: "Free",
    color: "#4CAF50",
    category: "price",
    description: "Free resources and content"
  },

  "premium": {
    id: "premium",
    label: "Premium",
    color: "#9C27B0",
    category: "price",
    description: "Premium paid content"
  },
  // Technology Tags
  "javascript": { 
    id: "javascript", 
    label: "JavaScript", 
    color: "#F0DB4F", 
    category: "technology",
    description: "JavaScript programming"
  },
  "html": { 
    id: "html", 
    label: "HTML", 
    color: "#E44D26", 
    category: "technology",
    description: "HTML markup language"
  },
  "css": { 
    id: "css", 
    label: "CSS", 
    color: "#2965F1", 
    category: "technology",
    description: "CSS styling"
  },
  "api": { 
    id: "api", 
    label: "API", 
    color: "#20B2AA", 
    category: "technology",
    description: "API development and consumption"
  },

  // UI/UX Tags
  "forms": { 
    id: "forms", 
    label: "Forms", 
    color: "#9B59B6", 
    category: "ui",
    description: "Form design and validation"
  },
  "responsive": { 
    id: "responsive", 
    label: "Responsive", 
    color: "#1ABC9C", 
    category: "ui",
    description: "Responsive design techniques"
  },

  // Infrastructure Tags
  "deployment": { 
    id: "deployment", 
    label: "Deployment", 
    color: "#3498DB", 
    category: "infrastructure",
    description: "Application deployment"
  },
  "dns": { 
    id: "dns", 
    label: "DNS", 
    color: "#7B68EE", 
    category: "infrastructure",
    description: "Domain Name System concepts"
  },
  "server": { 
    id: "server", 
    label: "Server", 
    color: "#FF6D00", 
    category: "infrastructure",
    description: "Server configuration and management"
  },

  // Methodology Tags
  "best-practices": { 
    id: "best-practices", 
    label: "Best Practices", 
    color: "#FBBC05", 
    category: "methodology",
    description: "Industry best practices"
  },
  "optimization": { 
    id: "optimization", 
    label: "Optimization", 
    color: "#3498DB", 
    category: "methodology",
    description: "Performance optimization"
  },

  // Platform Tags
  "mobile": { 
    id: "mobile", 
    label: "Mobile", 
    color: "#34A853", 
    category: "platform",
    description: "Mobile development"
  },

  // Development Tags
  "validation": { 
    id: "validation", 
    label: "Validation", 
    color: "#00C853", 
    category: "development",
    description: "Data validation techniques"
  },
  "networking": { 
    id: "networking", 
    label: "Networking", 
    color: "#EA4335", 
    category: "development",
    description: "Network programming concepts"
  }
};

// Helper types for categories
export const tagCategories = {
  domain: "Domain",
  security: "Security",
  level: "Level",
  technology: "Technology",
  ui: "UI/UX",
  infrastructure: "Infrastructure",
  methodology: "Methodology",
  platform: "Platform",
  development: "Development"
} as const;

export type TagCategory = keyof typeof tagCategories;