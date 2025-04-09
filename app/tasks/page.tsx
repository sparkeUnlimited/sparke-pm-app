"use client";
import Layout from "@/layout/Layout";
import TaskEntryForm from "@/components/TaskEntryForm";
import CrewAssignment from "@/components/CrewAssignment";

export default function TasksPage() {
  return (
    <Layout title="Tasks">
      <TaskEntryForm />
      <CrewAssignment />
    </Layout>
  );
}
