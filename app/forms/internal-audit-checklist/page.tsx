"use client";
import Layout from "@/layout/Layout";
import FormRenderer from "@/components/FormRenderer";
import formJson from "@/lib/EHS/Internal_Audit_Checklist.json";

export default function InternalAuditChecklistPage() {
  return (
    <Layout title="Internal Audit Checklist">
      <FormRenderer formJson={formJson} />
    </Layout>
  );
}
