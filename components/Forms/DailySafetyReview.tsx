"use client";
import formDefinition from "@/lib/EHS/Structured_Daily_Safety_Checklist.json";
import FormRenderer from "@/components/Forms/FormRenderer";

const DailySafetyReview = () => (
  <FormRenderer definition={formDefinition} />
);

export default DailySafetyReview;
