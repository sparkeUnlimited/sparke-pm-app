"use client";
import formDefinition from "@/lib/EHS/Corrective_Action_Register.json";
import FormRenderer from "@/components/Forms/FormRenderer";

const CorrectiveActionRegisterForm = () => 
<FormRenderer definition={formDefinition} />;

export default CorrectiveActionRegisterForm;
