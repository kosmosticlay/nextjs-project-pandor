interface FormButtonProps {
  loading?: boolean;
  className?: string;
  buttonName: string;
}

export default function FormButton({ buttonName, className }: FormButtonProps) {
  return <button className={`${className} primary-btn`}>{buttonName}</button>;
}
