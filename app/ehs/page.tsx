"use client";
import Layout from "@/layout/Layout";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import CorrectiveActionRegister from "@/lib/EHS/Corrective_Action_Register.json";
import InternalAuditChecklist from "@/lib/EHS/Internal_Audit_Checklist.json";
import InternalAuditReport from "@/lib/EHS/Internal_Audit_Report.json";
import ModifiedDutyLog from "@/lib/EHS/Modified_Duty_Log.json";
import ReturnToWorkAgreement from "@/lib/EHS/Return_to_Work_Agreement.json";
import SafetyObjectiveWorksheet from "@/lib/EHS/Safety_Objective_Worksheet.json";

const forms = [
  { def: CorrectiveActionRegister, slug: "corrective-action-register" },
  { def: InternalAuditChecklist, slug: "internal-audit-checklist" },
  { def: InternalAuditReport, slug: "internal-audit-report" },
  { def: ModifiedDutyLog, slug: "modified-duty-log" },
  { def: ReturnToWorkAgreement, slug: "return-to-work-agreement" },
  { def: SafetyObjectiveWorksheet, slug: "safety-objective-worksheet" },
];

export default function EHSPage() {
  return (
    <Layout title="Employee Health and Safety">
      <Typography variant="h4" gutterBottom>
        Employee Health and Safety
      </Typography>
      <Typography component="p">Below are the available EHS forms. Select one to begin.</Typography>
      <List>
        {forms.map((f) => (
          <ListItem key={f.slug} component={Link} href={`/forms/${f.slug}`}>
            <ListItemText primary={f.def.title} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}
