export interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
  errors?: string[];
  classname?: string;
  isDisabled?: boolean;
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  defaultValue,
  errors,
  classname,
  isDisabled,
}: FormInputProps) {
  return (
    <div className={`w-full flex flex-col gap-1 ${classname}`}>
      <input
        className="p-2 text-black rounded-sm bg-rose-100 outline-rose-400 border-none disabled:bg-stone-500"
        name={name}
        required={required}
        aria-label={placeholder}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={isDisabled}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
