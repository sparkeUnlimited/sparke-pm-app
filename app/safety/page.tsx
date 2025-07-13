"use client";
import Layout from "@/layout/Layout";
import DailySafetyReview from "@/components/DailySafetyReview";
import EquipmentSafetyCheck from "@/components/EquipmentSafetyCheck";
import EHSIntro from "@/components/EHSIntro";

export default function SafetyPage() {
  return (
    <Layout title="Site Safety">
      <EHSIntro />
      <DailySafetyReview />
      <EquipmentSafetyCheck />
    </Layout>
  );
}
