import { useState, useRef, useEffect } from "react";
import { validateCaptcha } from "react-simple-captcha";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import instance from "@/shared/api/axios/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

import TopArea from "@/shared/components/TopArea";
import Description from "@/shared/components/Description";
import PageTitle from "@/features/remembrance/lettersForm/PageTitle";
import FormInfo from "@/features/remembrance/lettersForm/FormInfo";
import { Label } from "@/shared/components/Label";
import TextInput from "@/shared/components/TextInput";
import RadioButton from "@/shared/components/RadioButton";
import Captcha from "@/shared/components/Captcha";
import Button from "@/shared/components/Button";
import CustomUploadAdapterPlugin from "@/shared/utils/ckeditor/CustomUploadAdapterPlugin";
import { AREA_OPTIONS } from "@/shared/constant/stories-form";

export default function StoriesForm() {
  const [areaCode, setAreaCode] = useState("AREA100");
  const [captchaInput, setCaptchaInput] = useState("");
  const [storyContents, setStoryContents] = useState("");

  const storyWriterRef = useRef<HTMLInputElement>(null);
  const storyPasscodeRef = useRef<HTMLInputElement>(null);
  const storyTitleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { storySeq } = useParams<{ storySeq: string }>();
  const isEdit = !!storySeq;

  // 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 유효성 검사
    // 코디네이터
    const storyWriter = storyWriterRef.current?.value.trim();
    if (!storyWriter) {
      alert("코디네이터 이름을 입력해 주세요.");
      return;
    }

    // 비밀번호
    const storyPasscode = storyPasscodeRef.current?.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!storyPasscode || !passwordRegex.test(storyPasscode)) {
      alert("비밀번호는 영문+숫자 조합의 8자 이상이어야 합니다.");
      return;
    }

    // 제목
    const storyTitle = storyTitleRef.current?.value.trim();
    if (!storyTitle) {
      alert("제목을 입력해 주세요.");
      return;
    }

    // 내용
    const rawContents = storyContents;
    const textOnly = rawContents.replace(/<[^>]*>/g, "").trim();
    const hasImage = rawContents.includes("<img");
    if (!textOnly && !hasImage) {
      alert("내용을 입력해 주세요.");
      return;
    }

    // 자동입력 방지
    if (!validateCaptcha(captchaInput)) {
      alert("자동입력 방지 숫자가 일치하지 않습니다.");
      return;
    }

    // 2. API 요청
    const formData = new FormData();
    formData.append("areaCode", areaCode);
    formData.append("storyTitle", storyTitle);
    formData.append("storyPasscode", storyPasscode);
    formData.append("storyWriter", storyWriter);
    formData.append("storyContents", storyContents);

    const url = isEdit ? `/donationLetters/${storySeq}` : "/donationLetters";
    const method = isEdit ? "patch" : "post";

    try {
      const response = await instance({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`${isEdit ? "수정" : "등록"} 성공:`, response.data);
      navigate(`${isEdit ? `/remembrance/stories-view/${storySeq}` : "/remembrance/stories"}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isEdit) return;

    const fetchLetterDetail = async () => {
      try {
        const { data } = await instance.get(`/donationLetters/${storySeq}`);
        const letter = data.data;

        // 값 세팅
        storyWriterRef.current!.value = letter.storyWriter;
        storyTitleRef.current!.value = letter.storyTitle;
        setAreaCode(letter.areaCode);
        setStoryContents(letter.storyContents);
      } catch (error) {
        console.error("기증자 스토리 조회 실패:", error);
      }
    };

    fetchLetterDetail();
  }, [storySeq]);

  return (
    <>
      <TopArea />
      <div className="m-auto max-w-[1280px] px-p10 pb-g12 pt-[76px] mobile:px-p6 mobile:pb-[60px] mobile:pt-[60px]">
        <Description
          startBefore="한국장기조직기증원 장기구득 코디네이터가 함께 한 영원히 기억되는 기증자의 숭고한 나눔의 순간과 아름다운 이야기를 적는 공간입니다."
          checkItems={[
            "KODA 장기구득 코디네이터들의 공간입니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
          ]}
        />
        <PageTitle title={isEdit ? "기증자 스토리 수정" : "기증자 스토리 작성"} />
        <form onSubmit={handleSubmit}>
          <FormInfo />
          <ul className="mt-p6 flex flex-wrap justify-between border-t border-gray-40 mobile:mt-p9 mobile:gap-g6 mobile:pt-p9">
            <li className="flex w-[52%] items-center gap-g6 px-p8 pb-p7 pt-p10 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="name"
                children="코디네이터"
                weight="bold"
                color="dark"
                size="l"
                required
                className="whitespace-nowrap mobile:w-full"
              />
              <TextInput
                id="name"
                height="large"
                placeholder="한글/영문 10글자"
                className="max-w-[400px] flex-1 mobile:max-w-none"
                maxLength={10}
                ref={storyWriterRef}
              />
            </li>
            <li className="flex w-[46%] items-center gap-g6 px-p8 pb-p7 pt-p10 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="password"
                children="비밀번호"
                weight="bold"
                color="dark"
                size="l"
                required
                className="whitespace-nowrap mobile:w-full"
              />
              <TextInput
                id="password"
                height="large"
                placeholder="영문+숫자 8자 이상"
                type="password"
                className="max-w-[400px] mobile:max-w-full"
                ref={storyPasscodeRef}
              />
            </li>
            <li className="flex w-full items-center gap-g6 px-p8 pb-p10 pt-p7 mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="area"
                children="권역"
                weight="bold"
                color="dark"
                size="l"
                required
                className="min-w-[68px] whitespace-nowrap mobile:w-full"
              />
              <RadioButton
                name="area"
                options={AREA_OPTIONS}
                selectedValue={areaCode}
                onChange={setAreaCode}
              />
            </li>
            <li className="flex w-full items-center gap-g6 border-t border-gray-40 px-p8 pb-p7 pt-p10 mobile:mt-p5 mobile:flex-wrap mobile:gap-g4 mobile:p-0 mobile:pt-p9">
              <Label
                htmlFor="title"
                children="제목"
                weight="bold"
                color="dark"
                size="l"
                required
                className="min-w-[68px] whitespace-nowrap"
              />
              <TextInput
                id="title"
                height="large"
                placeholder="한글/영문/숫자 50글자"
                maxLength={50}
                ref={storyTitleRef}
              />
            </li>
            <li className="w-full px-p8 py-p7 mobile:p-0">
              <Label
                children="내용"
                weight="bold"
                color="dark"
                size="l"
                required
                className="mb-p6 block mobile:mb-p5"
              />
              <CKEditor
                editor={ClassicEditor}
                config={{
                  extraPlugins: [CustomUploadAdapterPlugin],
                  placeholder: "내용을 입력하세요.",
                  licenseKey: "GPL",
                }}
                data={storyContents}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setStoryContents(data);
                }}
              />
            </li>
          </ul>

          <div className="mt-p10 flex items-end justify-between px-p8 mobile:mt-p7 mobile:flex-wrap mobile:gap-g6 mobile:px-0">
            <div className="mobile:w-full">
              <h6 className="mb-p3 text-b-md text-gray-70">자동입력 방지</h6>
              <Captcha value={captchaInput} onChange={setCaptchaInput} />
            </div>
            <div className="flex gap-g7 mobile:w-full mobile:justify-end mobile:gap-g3">
              <Button type="submit" children={isEdit ? "수정하기" : "등록하기"} />
              <Button
                type="button"
                variant="tertiary"
                children="취소"
                onClick={() => window.history.back()}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
