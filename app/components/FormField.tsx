import Input from "@/app/components/Input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormField({ label, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <label className="ph-label">{label}</label>
      <Input {...inputProps} />
    </div>
  );
}
