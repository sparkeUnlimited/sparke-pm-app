"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Corrective_Action_Register.json";
import CorrectiveActionRegisterForm from "@/app/components/forms/CorrectiveActionRegisterForm";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <Layout title={formDefinition.title}>
      <Typography variant="h4" gutterBottom>
        {formDefinition.title}
      </Typography>
      <Typography component={"p"}>{formDefinition.description}</Typography>
      <CorrectiveActionRegisterForm />
    </Layout>
  );
}
