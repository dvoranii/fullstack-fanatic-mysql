import { Step } from "./Accordion";

export interface TutorialContentItem {
  id: number;
  title: string;
  created_at: string;
  steps: Step[];
  image: string;
}
