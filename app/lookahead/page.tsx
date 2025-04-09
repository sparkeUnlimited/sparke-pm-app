"use client";
import Layout from "@/layout/Layout";
import LookAheadReport from "@/components/LookAheadReport";
import MaterialManager from "@/components/MaterialManager";

export default function LookAheadPage() {
  return (
    <Layout title="Look Ahead Report">
      <LookAheadReport />
      <MaterialManager />
    </Layout>
  );
}
