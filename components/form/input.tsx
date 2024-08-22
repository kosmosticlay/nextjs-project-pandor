interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="mb-2 w-full flex flex-col gap-1">
      <input
        className="p-2 text-black rounded-sm"
        name={name}
        required={required}
        aria-label={placeholder}
        type={type}
        placeholder={placeholder}
      ></input>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
