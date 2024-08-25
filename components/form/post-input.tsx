import { FormInputProps } from "./input";

export default function PostInput({
  name,
  type,
  required,
  placeholder,
  errors,
}: FormInputProps) {
  return (
    <div>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full h-10 mt-2 p-2 bg-transparent border border-stone-300 rounded-md focus:border-rose-400 focus:outline-none"
      ></input>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
