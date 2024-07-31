import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import SocialLoginButton from "@/components/SocialLoginButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-w-[400px] w-full min-h-screen flex-center flex-col gap-5 md:gap-0 md:flex-row">
      <div className="w-full h-[150px] bg-slate-400 flex-center md:w-1/2 md:h-screen">
        <div className="w-[300px] h-[150px] bg-slate-200 flex-center text-black">
          Painter Next Door Logo
        </div>
      </div>
      <div className="w-full bg-gray-600 flex-center flex-col md:w-1/2 md:h-screen">
        <div className="w-[300px] xl:w-[400px]">
          <form className="flex-center flex-col gap-1 mt-3">
            <FormInput
              type="email"
              placeholder="Email"
              required
              errors={[""]}
            />
            <FormInput
              type="password"
              placeholder="Password"
              required
              errors={[""]}
            />
            <FormButton className="mt-2" buttonName="로그인" />
          </form>
          <div className="h-px my-5 md:my-7 bg-white" />
          <div className="flex-center gap-2">
            <SocialLoginButton
              buttonName="SMS Login"
              imageSrc="/images/icons/icon-chat.svg"
            ></SocialLoginButton>
            <SocialLoginButton
              buttonName="Google Login"
              imageSrc="/images/logos/logo-google.svg"
            ></SocialLoginButton>
            <SocialLoginButton
              buttonName="Github Login"
              imageSrc="/images/logos/logo-github.svg"
            ></SocialLoginButton>
          </div>
          <Link
            className="block mt-7 text-center primary-btn"
            href="/create-account"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
