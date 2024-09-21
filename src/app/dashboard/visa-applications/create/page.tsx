import { FC } from "react";
import VisaApplicationForm from "../components/visa-application-form";

interface CreateVisaApplicationProps {}

const CreateVisaApplication: FC<CreateVisaApplicationProps> = ({}) => {
  return (
    <div>
      <VisaApplicationForm />
    </div>
  );
};

export default CreateVisaApplication;
