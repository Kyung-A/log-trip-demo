"use client";

import { useCallback, useEffect, useState } from "react";

import { ChevronLeft, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { IRegion } from "@/features/region";
import { blobUrlToBase64 } from "@/shared";
import { DEMO_USER_ID } from "@/shared/data";

import { ContentEditor } from "./ContentEditor";
import { DrawingCanvasDialog } from "./DrawingCanvasDialog";
import { DrawingModeToggle } from "./DrawingModeToggle";
import { ImageEditDialog } from "./ImageEditDialog";
import { UploadDiaryImageField } from "./UploadDiaryImageField";
import { useUser } from "@/features/user";

import { CitySelectField, IDiary, useDiary } from "../..";

const DEFAULT_FORM_VALUES: Partial<IDiary> = {
  user_id: "",
  title: null,
  text_content: "",
  drawing_content: null,
  is_drawing: false,
  travel_date: null,
  diary_images: [],
  diary_regions: [],
};

export const DiaryForm = ({
  regions,
  userId,
}: {
  regions: IRegion[] | null;
  userId?: string;
}) => {
  const [cities, setCities] = useState<IRegion[]>([]);
  const [imgs, setImgs] = useState<{ origin: string; modified: string }[]>([]);
  const [isOpenDrawing, setOpenDrawing] = useState<boolean>(false);
  const [isOpenEditMode, setOpenEditMode] = useState<boolean>(false);
  const [capturedDrawingImage, setCapturedDrawingImage] = useState<
    string | null
  >(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [currentEditImage, setCurrentEditImage] = useState<string | null>(null);

  const router = useRouter();

  const { setData } = useDiary();
  const { user } = useUser();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IDiary>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // 드로잉 <-> 텍스트 모드 전환
  const handleChangeMode = useCallback(
    (state: boolean) => {
      let returnState = false;

      if (state) {
        if (
          confirm(
            "드로잉 모드로 전환 하시겠습니까?\n드로잉 모드 전환시 작성한 텍스트는 사라집니다.",
          )
        ) {
          setValue("is_drawing", true);
          setOpenDrawing(true);
          returnState = true;
        }
      } else {
        if (
          confirm(
            "텍스트 모드로 전환 하시겠습니까?\n텍스트 모드 전환시 작성한 그림은 사라집니다.",
          )
        ) {
          setValue("is_drawing", false);
          setCapturedDrawingImage(null);
        } else {
          returnState = true;
        }
      }

      return returnState;
    },
    [setValue],
  );

  // 드로잉 이미지 캡쳐 핸들러
  const handleDrawingImageCapture = (
    imageDataUrl: string,
    canvasSize: { width: number; height: number },
  ) => {
    setCapturedDrawingImage(imageDataUrl);
    setCanvasSize(canvasSize);
  };

  // 업로드 이미지 편집 취소
  const handleCloseEditMode = useCallback(() => {
    setOpenEditMode(false);
    setCurrentEditImage(null);
  }, [setOpenEditMode, setCurrentEditImage]);

  // 업로드 이미지 편집 완료
  const handleSaveEditMode = useCallback(
    (imageDataUrl: string) => {
      setImgs((prev) =>
        prev.map((i) =>
          i.origin === currentEditImage ? { ...i, modified: imageDataUrl } : i,
        ),
      );

      handleCloseEditMode();
    },
    [currentEditImage, handleCloseEditMode],
  );

  // blob URL은 세션이 끝나면 사라지므로 data URL로 변환해서 저장
  const toDataUrl = async (file: string): Promise<string | null> => {
    if (!file) return null;
    if (file.startsWith("blob:")) {
      try {
        return await blobUrlToBase64(file);
      } catch {
        return null;
      }
    }
    return file;
  };

  // 다이어리 생성
  const handleCreateDiary = handleSubmit(
    async (formData: IDiary) => {
      let body = {
        ...formData,
        user_id: userId,
        diary_regions: cities.map((v) => ({
          region_code: v.region_code,
          region_name: v.region_name,
          shape_name: v.shape_name,
          country_code: v.country_code,
          country_name: v.country_name,
        })),
      };

      if (imgs && imgs.length > 0) {
        const results = await Promise.all(
          imgs.map((v) => toDataUrl(v.modified)),
        );

        const diaryImagesUrls = results
          .filter((url): url is string => url !== null)
          .map((url) => ({ url }));

        body = { ...body, diary_images: diaryImagesUrls };
      }

      if (formData.is_drawing) {
        const drawingContentUrl = await toDataUrl(capturedDrawingImage!);
        body = { ...body, drawing_content: drawingContentUrl };
      }

      const id = uuidv4();

      setData((prev) => [
        {
          ...body,
          id,
          user_id: DEMO_USER_ID,
          user_info: {
            nickname: user.nickname,
            email: user.email,
            profile_image: user.profile_image ?? "",
            about: user.about ?? "",
          },
        },
        ...prev,
      ]);

      router.push("/diary");
    },
    (error) => {
      toast.error(Object.values(error)[0].message);
    },
  );

  useEffect(() => {
    setValue("diary_regions", cities, {
      shouldValidate: true,
    });
  }, [cities, setValue]);

  return (
    <>
      <header className="sticky pt-14 pb-3 top-0 z-30 w-full bg-white border-b border-gray-300 flex items-center px-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-x-1"
        >
          <ChevronLeft size={30} color="#646464" />
          <span className="text-lg">뒤로</span>
        </button>
        {isSubmitting ? (
          <LoaderCircle
            className="animate-spin ml-auto w-12"
            size={24}
            color="#9f9fa9"
          />
        ) : (
          <button
            type="submit"
            onClick={handleCreateDiary}
            className="ml-auto text-lg text-blue-500 font-semibold px-2"
          >
            등록
          </button>
        )}
      </header>

      <UploadDiaryImageField
        imgs={imgs}
        setImgs={setImgs}
        setOpenEditMode={setOpenEditMode}
        setCurrentEditImage={setCurrentEditImage}
      />

      <CitySelectField
        value={cities}
        onConfirm={setCities}
        options={regions}
        fieldName="diary_regions"
        control={control}
      />

      <Controller
        control={control}
        name="travel_date"
        rules={{
          required: "여행일은 필수입니다.",
        }}
        render={({ field: { onChange, value } }) => (
          <label className="flex flex-wrap items-start justify-between w-full px-4 py-3 border-b border-gray-300">
            <p className="text-lg">여행일</p>
            <input
              type="date"
              value={
                value instanceof Date ? value.toISOString().split("T")[0] : ""
              }
              onChange={(date) => onChange(new Date(date.target.value))}
            />
          </label>
        )}
      />

      <Controller
        control={control}
        name="is_public"
        render={({ field: { onChange, value } }) => (
          <div className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-300">
            <label htmlFor="custom-check" className="text-lg">
              공개
            </label>
            <input
              id="custom-check"
              type="checkbox"
              onChange={onChange}
              defaultChecked={value}
              className="pure-checkbox"
            />
          </div>
        )}
      />

      <DrawingModeToggle
        isDrawing={watch("is_drawing")}
        onToggle={(state: boolean) => handleChangeMode(state)}
        onOpen={() => setOpenDrawing(true)}
      />

      <ContentEditor
        isDrawing={watch("is_drawing")}
        capturedDrawingImage={capturedDrawingImage}
        imageSize={canvasSize}
        control={control}
      />

      <DrawingCanvasDialog
        isOpenDrawing={isOpenDrawing}
        setOpenDrawing={setOpenDrawing}
        handleDrawingImageCapture={handleDrawingImageCapture}
      />

      <ImageEditDialog
        isOpenEditMode={isOpenEditMode}
        editImage={currentEditImage}
        handleCloseEditMode={handleCloseEditMode}
        handleSaveEditMode={handleSaveEditMode}
      />
    </>
  );
};
