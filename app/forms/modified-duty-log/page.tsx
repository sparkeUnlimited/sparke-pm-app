"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Modified_Duty_Log.json";
import ModifiedDutyLogForm from "@/app/components/forms/ModifiedDutyLogForm";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Typography variant="h4" gutterBottom>
        {formDefinition.title}
      </Typography>
      <Typography paragraph>{formDefinition.description}</Typography>
      <ModifiedDutyLogForm />
    </Layout>
  );
}
