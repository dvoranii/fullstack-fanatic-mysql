
export type FilterTag = {
    id: string;
    label: string;
    color?: string;
    category?: 
      | "domain" 
      | "security" 
      | "level" 
      | "technology" 
      | "ui" 
      | "infrastructure" 
      | "methodology" 
      | "platform" 
      | "development"
      | "price";
    description?: string;
  };
  
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