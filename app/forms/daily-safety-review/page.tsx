"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Structured_Daily_Safety_Checklist.json";
import DailySafetyReview from "@/components/Forms/DailySafetyReview";
import { Typography, Paper } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Paper sx={{ p: 4, mb: 3 }} elevation={4}>
        
        <Typography variant="h4" gutterBottom>
          {formDefinition.title}
        </Typography>
        <Typography component={"p"}>{formDefinition.description}</Typography>
        <DailySafetyReview />
      </Paper>
    </Layout>
  );
}
