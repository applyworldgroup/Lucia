"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCustomerById } from "@/features/actions/customers/actions";
import CustomerForm from "../../components/customer-form";

const UpdateCustomer: FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomerById(id as string),
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

export default UpdateCustomer;
