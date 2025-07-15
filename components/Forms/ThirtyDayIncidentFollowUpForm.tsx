"use client";
import formDefinition from "@/lib/EHS/30dayIncidientFollowUp.json";
import FormRenderer from "@/components/Forms/FormRenderer";

const ThirtyDayIncidentFollowUpForm = () => (
  <FormRenderer definition={formDefinition} />
);

export default ThirtyDayIncidentFollowUpForm;
