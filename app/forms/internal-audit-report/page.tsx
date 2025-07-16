"use client";
import Layout from "@/layout/Layout";
import formDefinition from "@/lib/EHS/Internal_Audit_Report.json";
import InternalAuditReportForm from "@/components/Forms/InternalAuditReportForm";
import { Typography, Paper, Box, TextField, Button } from "@mui/material";
import SignaturePad from "@/components/SignaturePad";
import { useState, useEffect, Fragment, ReactNode } from "react";
import { submitEHSForm } from "@/lib/api";

export default function Page() {
  const [clientSig, setClientSig] = useState("");

  const handleSubmit = async () => {
    try {
      await submitEHSForm({
        formTitle: formJson.title,
        submissionDate: new Date().toISOString(),
        sections: sectionRows,
      });
      alert("Form submitted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit form.");
    }
  };
  return (
    <Layout title={formDefinition.title}>
      <Paper sx={{ p: 4, mb: 3 }} elevation={4}>
        <Typography variant="h4" gutterBottom>
          {formDefinition.title}
        </Typography>
        <Typography component={"p"}>{formDefinition.description}</Typography>
        <Box sx={{ mb: 2 }}>
          <InternalAuditReportForm />

          <SignaturePad
            onChange={(sig) => {
              setClientSig(sig);
            }}
          />
          <TextField
            type="date"
            value={new Date().toISOString().split("T")[0]}
            disabled
            fullWidth
            sx={{ mb: 1 }}
          />

          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit Form here
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
}
