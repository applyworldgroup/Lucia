import { FC } from "react";
import SkillsAssessmentForm from "../components/skills-assessment-form";

interface CreateJrpProps {}

const CreateSkillsAssessment: FC<CreateJrpProps> = ({}) => {
  return (
    <div>
      <SkillsAssessmentForm />
    </div>
  );
};

export default CreateSkillsAssessment;
