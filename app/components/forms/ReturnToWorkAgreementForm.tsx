"use client";
import formDefinition from "@/lib/EHS/Return_to_Work_Agreement.json";
import FormRenderer from "./FormRenderer";

const ReturnToWorkAgreementForm = () => (
  <FormRenderer definition={formDefinition} />
);

export default ReturnToWorkAgreementForm;
