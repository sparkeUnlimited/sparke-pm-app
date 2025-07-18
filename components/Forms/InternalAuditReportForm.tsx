"use client";
import formDefinition from "@/lib/EHS/Internal_Audit_Report.json";
import FormRenderer from "@/components/Forms/FormRenderer";

const InternalAuditReportForm = () => (
  <FormRenderer definition={formDefinition} />
);

export default InternalAuditReportForm;
