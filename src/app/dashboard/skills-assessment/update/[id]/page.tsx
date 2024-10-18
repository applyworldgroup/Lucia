"use client";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import SkillsAssessmentForm from "../../components/skills-assessment-form";
import { getSkillsAssessment } from "@/features/actions/skills-assessment/actions";

const UpdateCustomer: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["skills-assessment", id],
    queryFn: () => getSkillsAssessment(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching application</div>;
  if (!data) return <div>No application found</div>;

  return (
    <div>
      <SkillsAssessmentForm initialData={data} />
    </div>
  );
};

export default UpdateCustomer;
