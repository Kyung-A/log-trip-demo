"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { DEMO_EMAIL, DEMO_PASSWORD } from "@/shared/data";

export default function EmailLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@logtrip.com");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      router.push("/world-map");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setIsPending(false);
    }
  };

  return (
    <div className="flex-1 px-6 pb-10 pt-40 bg-white flex flex-col gap-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <div>
          <label className="block text-base font-semibold mb-1.5">이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            readOnly
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 h-12 text-base border border-gray-300 rounded-md outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-base font-semibold mb-1.5">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            readOnly
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 h-12 text-base border border-gray-300 rounded-md outline-none focus:border-blue-400"
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="py-3 bg-blue-100 rounded-md text-blue-500 font-semibold text-base disabled:opacity-50"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
