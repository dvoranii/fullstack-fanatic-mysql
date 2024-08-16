export interface Step {
  title: string;
  content: React.ReactNode;
  component?: React.ReactNode;
}

export interface AccordionProps {
  steps: Step[];
}
