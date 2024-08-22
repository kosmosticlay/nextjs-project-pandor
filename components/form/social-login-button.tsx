import Image from "next/image";

interface SocialLoginButtonProps {
  buttonName: string;
  className?: string;
  imageSrc: string;
}

export default function SocialLoginButton({
  buttonName,
  className,
  imageSrc,
}: SocialLoginButtonProps) {
  return (
    <button
      className={`${className} size-11 rounded-full bg-white border bg-image-setting flex-center active:button-animation`}
      aria-label={buttonName}
      title={buttonName}
    >
      <Image src={imageSrc} alt={buttonName} width="40" height="40" />
    </button>
  );
}
