"use client";
import formDefinition from "@/lib/EHS/Internal_Audit_Checklist.json";
import FormRenderer from "@/components/Forms/FormRenderer";

const InternalAuditChecklistForm = () => (
  <FormRenderer definition={formDefinition} />
);

export default InternalAuditChecklistForm;
