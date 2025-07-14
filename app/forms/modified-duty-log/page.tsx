"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Modified_Duty_Log.json";
import ModifiedDutyLogForm from "@/components/Forms/ModifiedDutyLogForm";
import { Typography, Paper } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Paper sx={{ p: 4, mb: 3 }} elevation={4}>
        <Typography variant="h4" gutterBottom>
          {formDefinition.title}
        </Typography>
        <Typography component="p">{formDefinition.description}</Typography>
        <ModifiedDutyLogForm />
      </Paper>
    </Layout>
  );
}
