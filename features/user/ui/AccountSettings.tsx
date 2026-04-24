"use client";

import { useCallback, useEffect } from "react";

import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AccountSettings = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    redirect("/login");
  }, []);

  useEffect(() => {
    window.showWebAlert = (message: string) => {
      toast.error(message);
    };

    return () => {
      delete window.showWebAlert;
    };
  }, []);

  return (
    <>
      <button
        onClick={() => router.push("/mypage/update")}
        className="px-20 py-2 mt-14 border rounded-lg border-latte"
      >
        <p className="text-latte">프로필 수정</p>
      </button>
      <button onClick={() => handleLogout()} className="mt-6">
        <p className="text-latte underline">로그아웃</p>
      </button>
    </>
  );
};
