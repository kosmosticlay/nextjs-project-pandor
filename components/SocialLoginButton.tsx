interface SocialLoginButtonProps {
  buttonName: string;
  className?: string;
  imageSrc?: string;
}

export default function SocialLoginButton({
  buttonName,
  className,
  imageSrc,
}: SocialLoginButtonProps) {
  return (
    <button
      className={`${className} size-11 rounded-full bg-white border bg-image-setting flex-center`}
      aria-label={buttonName}
      title={buttonName}
    >
      <img src={imageSrc} alt={buttonName} className="size-6" />
    </button>
  );
}
