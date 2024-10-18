import { FC } from "react";
import CompanyForm from "../components/companies-form";

interface CreateCustomerProps {}

const CreateCustomer: FC<CreateCustomerProps> = ({}) => {
  return (
    <div>
      <CompanyForm />
    </div>
  );
};

export default CreateCustomer;
