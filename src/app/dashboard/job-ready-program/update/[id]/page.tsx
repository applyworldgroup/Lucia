"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import JRPFrom from "../../components/jrp-form";
import { getJrpApplication } from "@/features/actions/job-ready-program/actions";

const UpdateCustomer: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job-ready-program", id],
    queryFn: () => getJrpApplication(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching application</div>;
  if (!data) return <div>No application found</div>;

  return (
    <div>
      <JRPFrom initialData={data} />
    </div>
  );
};

export default UpdateCustomer;
