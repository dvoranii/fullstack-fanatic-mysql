interface Step {
  title: string;
  content: string;
  component?: string;
}

export interface AccordionProps {
  steps: Step[];
}
