export default function PostTextarea({
  name,
  errors,
}: {
  name: string;
  errors?: string[];
}) {
  return (
    <div>
      <textarea
        name={name}
        className="w-full h-44 p-2 bg-transparent border border-gray-300 rounded-sm resize-none"
      ></textarea>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-light">
          {error}
        </span>
      ))}
    </div>
  );
}
