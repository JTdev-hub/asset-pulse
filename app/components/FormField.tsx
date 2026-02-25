import Win2000Input from "@/app/components/Win2000Input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormField({ label, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <label className="ph-label">{label}</label>
      <Win2000Input {...inputProps} />
    </div>
  );
}
