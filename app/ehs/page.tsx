"use client";
import Layout from "@/layout/Layout";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import EHSIntro from "@/components/EHSIntro";
import DailySafetyReview from "@/lib/EHS/Structured_Daily_Safety_Checklist.json";
import EquipmentSafetyCheck from "@/lib/EHS/Equipment_Inspection_Checklist.json";
import ModifiedDutyLog from "@/lib/EHS/Modified_Duty_Log.json";
import ReturnToWorkAgreement from "@/lib/EHS/Return_to_Work_Agreement.json";
import SafetyObjectiveWorksheet from "@/lib/EHS/Safety_Objective_Worksheet.json";

const links = [
  { title: "Incident Reporting", href: "/ehs/incident-reporting" },
  { title: "Return to Work", href: "/ehs/return-to-work" },
  { title: "Safety Checklists", href: "/ehs/safety-checklists" },
  { title: ModifiedDutyLog.title, href: "/forms/modified-duty-log" },
  { title: ReturnToWorkAgreement.title, href: "/forms/return-to-work-agreement" },
  { title: SafetyObjectiveWorksheet.title, href: "/forms/safety-objective-worksheet" },
  { title: DailySafetyReview.title, href: "/forms/daily-safety-review" },
  { title: EquipmentSafetyCheck.title, href: "/forms/equipment-safety-check" },
];

export default function EHSPage() {
  return (
    <Layout title="Employee Health and Safety">
      <EHSIntro />
  

      <Paper sx={{ p: 4 }} elevation={4}>
      {/*   <Typography variant="h4" gutterBottom>
          Employee Health and Safety
        </Typography>
        <Typography component="p">
          Below are the available EHS forms. Select one to begin.
        </Typography> */}
        <List>
          {links.map((l) => (
            <ListItem key={l.href} component={Link} href={l.href}>
              <ListItemText primary={l.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Layout>
  );
}
