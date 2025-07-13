"use client";
import formDefinition from "@/lib/EHS/Modified_Duty_Log.json";
import FormRenderer from "@/components/Forms/FormRenderer";

const ModifiedDutyLogForm = () => (
  <FormRenderer definition={formDefinition} />
);

export default ModifiedDutyLogForm;
