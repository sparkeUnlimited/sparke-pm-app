"use client";
import raw from "@/lib/EHS/Safety_Objective_Worksheet.json";
import FormRenderer, { FormDefinition } from "@/components/Forms/FormRenderer";

const definition: FormDefinition = {
  title: raw.title,
  description: raw.description,
  sections: [
    {
      title: "Objectives",
      fields: raw.columns.map((c: string) => ({ label: c, type: "text" })),
    },
  ],
};

const SafetyObjectiveWorksheetForm = () => (
  <FormRenderer definition={definition} />
);

export default SafetyObjectiveWorksheetForm;
