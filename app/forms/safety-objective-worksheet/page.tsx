"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Safety_Objective_Worksheet.json";
import SafetyObjectiveWorksheetForm from "@/app/components/forms/SafetyObjectiveWorksheetForm";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Typography variant="h4" gutterBottom>
        {formDefinition.title}
      </Typography>
      <Typography paragraph>{formDefinition.description}</Typography>
      <SafetyObjectiveWorksheetForm />
    </Layout>
  );
}
