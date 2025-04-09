"use client";
import Layout from "@/layout/Layout";
import DailySafetyReview from "@/components/DailySafetyReview";
import EquipmentSafetyCheck from "@/components/EquipmentSafetyCheck";

export default function SafetyPage() {
  return (
    <Layout title="Site Safety">
      <DailySafetyReview />
      <EquipmentSafetyCheck />
    </Layout>
  );
}
