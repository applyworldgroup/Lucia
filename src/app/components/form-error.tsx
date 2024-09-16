import { TriangleAlertIcon } from "lucide-react";
import { FC } from "react";

interface FormErrorProps {
    error: string | undefined
}

const FormError: FC<FormErrorProps> = ({error}) => {
  return (
    <div className="mt-1 pt-2 flex items-center text-xs text-red-500">
      <TriangleAlertIcon className="mr-2 h-4 w-4" />
      <span>{error}</span>
    </div>
  );
};

export default FormError;