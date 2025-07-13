"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Internal_Audit_Report.json";
import InternalAuditReportForm from "@/app/components/forms/InternalAuditReportForm";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Typography variant="h4" gutterBottom>
        {formDefinition.title}
      </Typography>
      <Typography paragraph>{formDefinition.description}</Typography>
      <InternalAuditReportForm />
    </Layout>
  );
}
