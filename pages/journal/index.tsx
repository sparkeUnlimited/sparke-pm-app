import Layout from "@/layout/Layout";
import JobSiteJournalForm from "@/components/JobSiteJournalForm";
import DailyScheduleSummary from "@/components/DailyScheduleSummary";
import SyncStatusDashboard from "@/components/SyncStatusDashboard";

export default function JournalPage() {
  return (
    <Layout title="Daily Journal">
      <DailyScheduleSummary />
      <JobSiteJournalForm />
      <SyncStatusDashboard />
    </Layout>
  );
}
