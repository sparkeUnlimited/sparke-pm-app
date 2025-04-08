import Layout from "@/layout/Layout";
import GCSharedDashboard from "@/components/GCSharedDashboard";
import TaskTimeline from "@/components/TaskTimeline";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <GCSharedDashboard />
      <TaskTimeline />
    </Layout>
  );
}
