import { Step } from "../Accordion";
export interface BlogContentItem {
  id: number;
  title: string;
  created_at: string;
  steps: Step[];
  image: string;
  isPremium: boolean;
}
