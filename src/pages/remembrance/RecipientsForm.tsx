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
import { Checkbox } from "@/shared/components/Checkbox";
import { Dropdown } from "@/shared/components/Dropdown";
import Captcha from "@/shared/components/Captcha";
import Button from "@/shared/components/Button";
import CustomUploadAdapterPlugin from "@/shared/utils/ckeditor/CustomUploadAdapterPlugin";

export default function RecipientsForm() {
  const [anonymityFlag, setAnonymityFlag] = useState(false);
  const [organCode, setOrganCode] = useState("");
  const [organEtc, setOrganEtc] = useState("");
  const [recipientYear, setRecipientYear] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [letterContents, setLetterContents] = useState("");

  const letterWriterRef = useRef<HTMLInputElement>(null);
  const letterPasscodeRef = useRef<HTMLInputElement>(null);
  const letterTitleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { letterSeq } = useParams<{ letterSeq: string }>();
  const isEdit = !!letterSeq;

  // 익명
  const handleCheckboxChange = () => {
    setAnonymityFlag((prev) => !prev);
  };

  // 수혜장기
  const organOptions = [
    { label: "신장", value: "ORGAN001" },
    { label: "간장", value: "ORGAN002" },
    { label: "췌장", value: "ORGAN003" },
    { label: "심장", value: "ORGAN004" },
    { label: "폐", value: "ORGAN005" },
    { label: "췌도", value: "ORGAN006" },
    { label: "소장", value: "ORGAN007" },
    { label: "대장", value: "ORGAN008" },
    { label: "위장", value: "ORGAN009" },
    { label: "십이지장", value: "ORGAN010" },
    { label: "비장", value: "ORGAN011" },
    { label: "손,팔", value: "ORGAN012" },
    { label: "안구", value: "ORGAN013" },
    { label: "인체조직", value: "ORGAN014" },
    { label: "직접입력", value: "ORGAN000" },
  ];

  useEffect(() => {
    if (organCode !== "ORGAN000") {
      setOrganEtc("");
    }
  }, [organCode]);

  // 수혜연도
  const currentYear = new Date().getFullYear();
  const startYear = 1995;
  const yearOptions = Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
    const year = currentYear - i;
    return { label: String(year), value: String(year) };
  });

  // 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 유효성 검사
    // 수혜자
    const letterWriter = letterWriterRef.current?.value.trim();
    if (!letterWriter) {
      alert("수혜자 이름을 입력해 주세요.");
      return;
    }

    // 비밀번호
    const letterPasscode = letterPasscodeRef.current?.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!letterPasscode || !passwordRegex.test(letterPasscode)) {
      alert("비밀번호는 영문+숫자 조합의 8자 이상이어야 합니다.");
      return;
    }

    // 수혜장기
    if (!organCode) {
      alert("수혜장기를 선택해 주세요.");
      return;
    }
    let organEtc = "";
    if (organCode === "ORGAN000") {
      const organEtcInput = (document.getElementById("search") as HTMLInputElement)?.value.trim();
      if (!organEtcInput) {
        alert("직접 입력을 선택하셨다면 장기명을 입력해 주세요.");
        return;
      }
      organEtc = organEtcInput;
    }

    // 수혜연도
    if (!recipientYear) {
      alert("수혜연도를 선택해 주세요.");
      return;
    }

    // 제목
    const letterTitle = letterTitleRef.current?.value.trim();
    if (!letterTitle) {
      alert("제목을 입력해 주세요.");
      return;
    }

    // 내용
    const rawContents = letterContents;
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
    formData.append("organCode", organCode);
    formData.append("organEtc", organEtc);
    formData.append("letterTitle", letterTitle);
    formData.append("recipientYear", recipientYear);
    formData.append("letterPasscode", letterPasscode);
    formData.append("letterWriter", letterWriter);
    formData.append("anonymityFlag", anonymityFlag ? "Y" : "N");
    formData.append("letterContents", letterContents);

    const url = isEdit ? `/recipientLetters/${letterSeq}` : "/recipientLetters";
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
      navigate(
        `${isEdit ? `/remembrance/recipients-view/${letterSeq}` : "/remembrance/recipients"}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isEdit) return;

    const fetchLetterDetail = async () => {
      try {
        const { data } = await instance.get(`/recipientLetters/${letterSeq}`);
        const letter = data.data;

        // 값 세팅
        letterWriterRef.current!.value = letter.letterWriter;
        letterTitleRef.current!.value = letter.letterTitle;
        setAnonymityFlag(letter.anonymityFlag === "Y");
        setOrganCode(letter.organCode);
        setOrganEtc(letter.organEtc ?? "");
        setRecipientYear(letter.recipientYear);
        setLetterContents(letter.letterContents);
      } catch (error) {
        console.error("편지 조회 실패:", error);
      }
    };

    fetchLetterDetail();
  }, [letterSeq]);

  return (
    <>
      <TopArea />
      <div className="m-auto max-w-[1280px] px-p10 pb-g12 pt-[76px] mobile:px-p6 mobile:pb-[60px] mobile:pt-[60px]">
        <Description
          startBefore="수혜자 편지는 이식으로 새생명을 살고 있는 분들의 이야기입니다.언제 어디서나 시간과 장소에 구애받지 않고, 익명으로 작성이 가능합니다."
          checkItems={[
            "생명을 나눠준 기증자에 대한 예의를 지켜주시고 존중해주시기 바랍니다.",
            "비방이나 욕설 등 분위기를 해치는 내용은 작성자에 의해 임의 삭제될수 있습니다.",
            "개인정보 노출을 자제해주세요.",
            "이 게시판에 올린 글은 한국장기조직기증원 뉴스레터에 원문의 의미를 훼손하지 않는 범위내에서 교정을 거쳐 임의 수록할 수 있음을 양지하시기 바랍니다.",
          ]}
        />
        <PageTitle title={isEdit ? "수혜자 편지 수정" : "수혜자 편지 작성"} />
        <form onSubmit={handleSubmit}>
          <FormInfo />
          <ul className="mt-p6 flex flex-wrap justify-between border-t border-gray-40 mobile:mt-p9 mobile:gap-g6 mobile:pt-p9">
            <li className="flex w-[54%] items-center gap-g6 px-p8 pb-p7 pt-p10 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="name"
                children="수혜자"
                weight="bold"
                color="dark"
                size="l"
                required
                className="min-w-[85px] whitespace-nowrap mobile:w-full"
              />
              <TextInput
                id="name"
                height="large"
                placeholder="한글/영문 10글자"
                className="max-w-[400px] flex-1 mobile:max-w-none"
                maxLength={10}
                ref={letterWriterRef}
              />
              <Checkbox
                id="checkbox-anonymous"
                label="익명"
                checked={anonymityFlag}
                onChange={handleCheckboxChange}
                className="whitespace-nowrap mobile:ml-p2"
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
                ref={letterPasscodeRef}
              />
            </li>
            <li className="flex w-[54%] items-center gap-g6 px-p8 pb-p10 pt-p7 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="search"
                children="수혜장기"
                weight="bold"
                color="dark"
                size="l"
                required
                className="min-w-[85px] whitespace-nowrap mobile:w-full"
              />
              <Dropdown
                options={organOptions}
                value={organCode}
                onChange={setOrganCode}
                placeholder="선택해 주세요."
                className="h-[56px] w-[29%] mobile:flex-1"
              />
              <TextInput
                id="search"
                height="large"
                placeholder="직접 입력"
                className="w-[35%] mobile:flex-1"
                disabled={organCode !== "ORGAN000"}
                value={organEtc}
                onChange={(e) => setOrganEtc(e.target.value)}
              />
            </li>
            <li className="flex w-[46%] items-center gap-g6 px-p8 pb-p10 pt-p7 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="search"
                children="수혜연도"
                weight="bold"
                color="dark"
                size="l"
                required
                className="whitespace-nowrap mobile:w-full"
              />
              <Dropdown
                options={yearOptions}
                value={recipientYear}
                onChange={setRecipientYear}
                placeholder="선택해 주세요."
                className="h-[56px] flex-1"
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
                className="min-w-[85px] whitespace-nowrap"
              />
              <TextInput
                id="title"
                height="large"
                placeholder="한글/영문/숫자 50글자"
                maxLength={50}
                ref={letterTitleRef}
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
                data={letterContents}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setLetterContents(data);
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
              <Button type="submit" children={isEdit ? "편지 수정" : "편지 등록"} />
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
