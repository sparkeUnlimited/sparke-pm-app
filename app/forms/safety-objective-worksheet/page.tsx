"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Safety_Objective_Worksheet.json";
import SafetyObjectiveWorksheetForm from "@/components/Forms/SafetyObjectiveWorksheetForm";
import { Typography, Paper } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Paper sx={{ p: 4, mb: 3 }} elevation={4}>
        <Typography variant="h4" gutterBottom>
          {formDefinition.title}
        </Typography>
        <Typography component="p">{formDefinition.description}</Typography>
        <SafetyObjectiveWorksheetForm />
      </Paper>
    </Layout>
  );
}
