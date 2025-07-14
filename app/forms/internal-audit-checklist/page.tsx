"use client";
import FormRenderer from "@/components/Forms/FormRenderer";
import formJson from "@/lib/EHS/Internal_Audit_Checklist.json";

export default function InternalAuditChecklistPage() {
  return <FormRenderer definition={formJson} />;
}
