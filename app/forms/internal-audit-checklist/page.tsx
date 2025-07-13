"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Internal_Audit_Checklist.json";
import InternalAuditChecklistForm from "@/components/Forms/InternalAuditChecklistForm";
import { Typography, Paper } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Paper sx={{ p: 4, mb: 3 }} elevation={4}>
        <Typography variant="h4" gutterBottom>
          {formDefinition.title}
        </Typography>
        <Typography component="p">{formDefinition.description}</Typography>
        <InternalAuditChecklistForm />
      </Paper>
    </Layout>
  );
}
