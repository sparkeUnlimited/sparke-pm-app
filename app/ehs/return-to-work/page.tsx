"use client";
import Layout from "@/layout/Layout";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import ModifiedDutyLog from "@/lib/EHS/Modified_Duty_Log.json";
import ReturnToWorkAgreement from "@/lib/EHS/Return_to_Work_Agreement.json";

const forms = [
  { def: ModifiedDutyLog, slug: "modified-duty-log" },
  { def: ReturnToWorkAgreement, slug: "return-to-work-agreement" },
];

export default function ReturnToWorkPage() {
  return (
    <Layout title="Return to Work">
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
