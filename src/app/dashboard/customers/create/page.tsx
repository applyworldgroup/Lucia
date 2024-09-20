import { FC } from "react";
import CustomerForm from "../components/customer-form";

interface CreateCustomerProps {}

const CreateCustomer: FC<CreateCustomerProps> = ({}) => {
  return (
    <div>
      <CustomerForm />
    </div>
  );
};

export default CreateCustomer;
