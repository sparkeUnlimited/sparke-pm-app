"use client";
import Layout from "@/layout/Layout";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import CorrectiveActionRegister from "@/lib/EHS/Corrective_Action_Register.json";
import InternalAuditReport from "@/lib/EHS/Internal_Audit_Report.json";
import InternalAuditChecklist from "@/lib/EHS/Internal_Audit_Checklist.json";
import ThirtyDayIncidentFollowUp from "@/lib/EHS/30dayIncidientFollowUp.json";

const forms = [
  { def: CorrectiveActionRegister, slug: "corrective-action-register" },
  { def: InternalAuditReport, slug: "internal-audit-report" },
  { def: InternalAuditChecklist, slug: "internal-audit-checklist" },
  { def: ThirtyDayIncidentFollowUp, slug: "30day-incident-follow-up" },
];

export default function IncidentReportingPage() {
  return (
    <Layout title="Incident Reporting">
      <Paper sx={{ p: 4 }} elevation={4}>
        <List>
          {forms.map((f) => (
            <ListItem key={f.slug} component={Link} href={`/forms/${f.slug}`}>
              <ListItemText primary={f.def.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Layout>
  );
}
