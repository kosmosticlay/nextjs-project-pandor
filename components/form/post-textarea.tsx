export default function PostTextarea({
  name,
  errors,
  placeholder,
}: {
  name: string;
  errors?: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <textarea
        name={name}
        placeholder={placeholder}
        className="w-full h-44 mt-2 p-2 bg-transparent border border-stone-300 rounded-md resize-none focus:border-rose-400 focus:outline-none"
      ></textarea>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
