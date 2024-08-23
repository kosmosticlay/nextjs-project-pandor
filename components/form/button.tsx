"use client";

import { useFormStatus } from "react-dom";
import Spinner from "./loader-spinner";

interface FormButtonProps {
  className?: string;
  children: string;
}

export default function FormButton({ children, className }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={`${className} primary-btn`}>
      {pending ? <Spinner /> : children}
    </button>
  );
}
