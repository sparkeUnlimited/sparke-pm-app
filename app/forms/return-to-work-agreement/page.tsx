"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Return_to_Work_Agreement.json";
import ReturnToWorkAgreementForm from "@/app/components/forms/ReturnToWorkAgreementForm";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Typography variant="h4" gutterBottom>
        {formDefinition.title}
      </Typography>
      <Typography paragraph>{formDefinition.description}</Typography>
      <ReturnToWorkAgreementForm />
    </Layout>
  );
}
