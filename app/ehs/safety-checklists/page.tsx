"use client";
import Layout from "@/layout/Layout";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import DailySafetyReview from "@/lib/EHS/Structured_Daily_Safety_Checklist.json";
import EquipmentSafetyCheck from "@/lib/EHS/Equipment_Inspection_Checklist.json";

const forms = [
  { def: DailySafetyReview, slug: "daily-safety-review" },
  { def: EquipmentSafetyCheck, slug: "equipment-safety-check" },
];

export default function SafetyChecklistsPage() {
  return (
    <Layout title="Safety Checklists">
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
