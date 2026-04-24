"use client";

import { useCallback, useRef, useState } from "react";

import { Camera, ChevronLeft, LoaderCircle, UserRound, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { useDiary } from "@/features/diary";
import { blobUrlToBase64 } from "@/shared";

import { useUser } from "../model";

interface ProfileFormValues {
  nickname: string;
  about: string | null;
}

export const UserProfileForm = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { setData } = useDiary();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      nickname: user.nickname,
      about: user.about,
    },
  });

  const [profileImg, setProfileImg] = useState<string | null>(
    user.profile_image,
  );

  const handleDeleted = useCallback(() => setProfileImg(null), []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files;
      if (!file || file.length === 0) return;
      setProfileImg(URL.createObjectURL(file[0]));
      event.target.value = "";
    },
    [],
  );

  const handleSaveProfile = async (formData: ProfileFormValues) => {
    try {
      let imageUrl: string | null = profileImg;
      if (profileImg?.startsWith("blob:")) {
        imageUrl = await blobUrlToBase64(profileImg);
      }

      const updated = {
        ...user,
        nickname: formData.nickname,
        about: formData.about,
        profile_image: imageUrl,
      };

      setUser(updated);
      setData((prev) =>
        prev.map((d) =>
          d.user_id === user.id
            ? {
                ...d,
                user_info: {
                  ...d.user_info,
                  nickname: updated.nickname,
                  about: updated.about ?? "",
                  profile_image: imageUrl ?? "",
                },
              }
            : d,
        ),
      );

      router.push("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="bg-white max-w-3xl pb-2 pt-14 fixed w-full py-2 border-b border-gray-200 flex items-center justify-between px-4">
        <button
          onClick={() => router.push("/mypage")}
          className="flex items-center gap-x-1"
        >
          <ChevronLeft size={22} color="#646464" />
          <span className="text-lg">뒤로</span>
        </button>
        {isSubmitting ? (
          <LoaderCircle
            className="animate-spin ml-auto"
            size={24}
            color="#9f9fa9"
          />
        ) : (
          <button
            type="submit"
            className="text-lg text-blue-500"
            onClick={handleSubmit(handleSaveProfile)}
          >
            완료
          </button>
        )}
      </header>

      <main className="items-center flex flex-col w-full min-h-screen">
        <div className="relative w-32 h-32 mt-40 bg-[#d5b2a7] rounded-full">
          {profileImg ? (
            <button
              onClick={handleDeleted}
              className="absolute right-0 top-1 bg-[#cdc6c3] rounded-full w-8 h-8 flex items-center justify-center"
            >
              <X size={20} color="#fff" />
            </button>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-0 top-1 bg-[#cdc6c3] rounded-full w-8 h-8 flex items-center justify-center"
            >
              <Camera size={20} color="#fff" />
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {profileImg ? (
            <Image
              src={profileImg}
              width={0}
              height={0}
              sizes="100vw"
              alt="profile image"
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <div className="items-center flex justify-center w-full h-full">
              <UserRound size={60} color="#fff" />
            </div>
          )}
        </div>

        <Controller
          control={control}
          name="nickname"
          render={({ field: { onChange, value } }) => (
            <input
              className="w-40 mt-6 text-xl font-semibold text-center outline-0"
              placeholder="닉네임을 작성해주세요"
              onChange={onChange}
              value={value}
              maxLength={10}
              readOnly
            />
          )}
        />
        <Controller
          control={control}
          name="about"
          render={({ field: { onChange, value } }) => (
            <input
              className="w-64 mt-4 text-center outline-0"
              placeholder="소개를 작성해주세요"
              onChange={onChange}
              value={value ?? ""}
              maxLength={30}
            />
          )}
        />
      </main>
    </>
  );
};
