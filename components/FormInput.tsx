interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        className="p-2 text-black rounded-sm"
        required={required}
        aria-label={placeholder}
        type={type}
        placeholder={placeholder}
      ></input>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light px-2">
          {error}
        </span>
      ))}
    </div>
  );
}
