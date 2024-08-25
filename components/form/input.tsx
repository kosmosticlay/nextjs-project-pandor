export interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
  errors?: string[];
  classname?: string;
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  defaultValue,
  errors,
  classname,
}: FormInputProps) {
  return (
    <div className={`w-[500px] lg:w-full flex flex-col gap-1 ${classname}`}>
      <input
        className="p-2 text-black rounded-sm bg-rose-100 outline-rose-400 border-none"
        name={name}
        required={required}
        aria-label={placeholder}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></input>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
