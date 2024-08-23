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
        aria-label={placeholder}
        className="w-full h-10 p-2 bg-transparent border border-gray-300 rounded-sm"
      ></input>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
