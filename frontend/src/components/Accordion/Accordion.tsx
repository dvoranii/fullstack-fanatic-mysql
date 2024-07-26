import { useState } from "react";
import {
  AccordionWrapper,
  AccordionItem,
  AccordionTitle,
  AccordionContent,
} from "./Accordion.styled";

interface Step {
  title: string;
  content: string;
  component?: string;
}

interface AccordionProps {
  steps: Step[];
}

const Accordion: React.FC<AccordionProps> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <AccordionWrapper>
      {steps.map((step, index) => (
        <AccordionItem key={index}>
          <AccordionTitle onClick={() => toggleAccordion(index)}>
            {step.title}
          </AccordionTitle>
          {activeIndex === index && (
            <AccordionContent>
              <div>{step.content}</div>
              {/* Render custom components based on the step.component value */}
              {/* {step.component === "Component1" && <Component1 />}
              {step.component === "Component2" && <Component2 />} */}
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </AccordionWrapper>
  );
};

export default Accordion;
