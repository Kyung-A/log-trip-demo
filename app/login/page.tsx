import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6">
      <div className="w-40 h-40 relative">
        <Image
          src="/images/logo/logo.png"
          alt="로그트립 로고"
          fill
          className="object-contain"
        />
      </div>

      <div className="mt-14 flex flex-col items-center gap-y-2 w-60">
        {/* 카카오 로그인 (UI만) */}
        <Link
          href="#"
          className="flex items-center justify-center gap-x-2 w-full h-12 rounded-full bg-[#fee502] border border-[#fee502]"
        >
          <div className="w-5 h-5 relative">
            <Image
              src="/images/logo/kakao-logo.png"
              alt="카카오"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-[#181600]">
            카카오로 로그인
          </span>
        </Link>

        {/* 네이버 로그인 (UI만) */}
        <Link
          href="#"
          className="flex items-center justify-center gap-x-1 w-full h-12 rounded-full bg-[#00c659] border border-[#00c659]"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/images/logo/naver-logo.png"
              alt="네이버"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-white">네이버로 로그인</span>
        </Link>

        {/* 애플 로그인 (UI만) */}
        <Link
          href="#"
          className="flex items-center justify-center gap-x-2 w-full h-12 rounded-full bg-black border border-black"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.55-1.32 3.08-2.53 4.08M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
          </svg>
          <span className="text-lg font-bold text-white">Apple로 로그인</span>
        </Link>

        <Link
          href="/login/email"
          className="mt-4 text-base text-center underline text-gray-600"
        >
          이메일로 로그인
        </Link>
      </div>
    </div>
  );
}
