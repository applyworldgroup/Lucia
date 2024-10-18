"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CompanyForm from "../../components/companies-form";
import { getCompanyById } from "@/features/actions/company/actions";

const UpdateCompany: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comapnies", id],
    queryFn: () => getCompanyById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching application</div>;
  if (!data) return <div>No application found</div>;

  return (
    <div>
      <CompanyForm initialData={data} />
    </div>
  );
};

export default UpdateCompany;
