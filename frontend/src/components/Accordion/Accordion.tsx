import { useState } from "react";
import {
  AccordionWrapper,
  AccordionItem,
  AccordionTitle,
  AccordionContent,
} from "./Accordion.styled";

import { AccordionProps } from "../../types/Accordion";

const Accordion: React.FC<AccordionProps> = ({ steps }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <AccordionWrapper>
      {steps.map((step, index) => (
        <AccordionItem key={index}>
          <AccordionTitle onClick={() => toggleAccordion(index)}>
            {step.title}
          </AccordionTitle>
          {activeIndices.includes(index) && (
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
