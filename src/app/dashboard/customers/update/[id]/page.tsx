"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "@/features/actions/customers/actions";
import CustomerForm from "../../components/customer-form";

interface UpdateCustomer {
  id: string;
}
const UpdateCustomer: FC<UpdateCustomer> = ({ id }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching customer</div>;
  if (!data || !data.success || !data.data) return <div>No customer found</div>;

  return (
    <div>
      <CustomerForm initialData={data.data} />
    </div>
  );
};

export default CustomerForm;
