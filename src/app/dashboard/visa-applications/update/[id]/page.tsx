"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"; // Import useParams for dynamic routes
import VisaApplicationForm from "../../components/visa-application-form";
import { getVisaApplication } from "../../../../../features/actions/visa-applications/actions";

const UpdateVisaApplication: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["visa-applications", id],
    queryFn: () => getVisaApplication(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching application</div>;
  if (!data) return <div>No application found</div>;

  return (
    <div>
      <VisaApplicationForm initialData={data} />
    </div>
  );
};

export default UpdateVisaApplication;
