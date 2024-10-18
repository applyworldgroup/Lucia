import { FC } from "react";
import JRPFrom from "../components/jrp-form";
interface CreateJrpProps {}

const CreateVisaApplication: FC<CreateJrpProps> = ({}) => {
  return (
    <div>
      <JRPFrom />
    </div>
  );
};

export default CreateVisaApplication;
