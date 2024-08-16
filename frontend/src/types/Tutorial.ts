import React from "react";

export interface Tutorial {
  id: number;
  title: string;
  content: React.ReactNode;
  created_at: string;
  isFavourited: boolean;
  image: string;
}
