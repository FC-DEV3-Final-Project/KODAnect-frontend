import { useState, useRef, useEffect } from "react";
import { validateCaptcha } from "react-simple-captcha";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import instance from "@/shared/api/axios/axiosInstance";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import TopArea from "@/shared/components/TopArea";
import Description from "@/shared/components/Description";
import PageTitle from "@/features/remembrance/lettersForm/PageTitle";
import FormInfo from "@/features/remembrance/lettersForm/FormInfo";
import { Label } from "@/shared/components/Label";
import TextInput from "@/shared/components/TextInput";
import { Checkbox } from "@/shared/components/Checkbox";
import { Modal } from "@/shared/components/Modal";
import DatePicker from "@/shared/components/calendar/DatePicker";
import Table from "@/shared/components/Table";
import Pagination from "@/shared/components/Pagination";
import Captcha from "@/shared/components/Captcha";
import Button from "@/shared/components/Button";
import CustomUploadAdapterPlugin from "@/shared/utils/ckeditor/CustomUploadAdapterPlugin";

interface Donor {
  donateSeq: number;
  donorName: string;
  donateDate: string;
  genderFlag: string;
  donateAge: number;
}

export default function LettersForm() {
  const [anonymityFlag, setAnonymityFlag] = useState(false);
  const [letterContents, setLetterContents] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  // 기증자 검색
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<Donor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const letterWriterRef = useRef<HTMLInputElement>(null);
  const letterPasscodeRef = useRef<HTMLInputElement>(null);
  const letterTitleRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { letterSeq } = useParams<{ letterSeq: string }>();
  const isEdit = !!letterSeq;

  const handleDonorSearch = async (page: number = 1) => {
    if (!searchKeyword.trim()) return;

    try {
      const response = await instance.get("/remembrance/heaven", {
        params: {
          startDate: range.from?.toISOString().split("T")[0],
          endDate: range.to?.toISOString().split("T")[0],
          keyWord: searchKeyword,
          size: 10,
          page,
        },
      });

      setTotalElements(response.data.data.totalElements);
      setSearchResult(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("기증자 검색 실패", error);
    }
  };

  const resetDonorSearch = () => {
    setSearchKeyword("");
    setRange({ from: null, to: null });
    setTotalElements(0);
    setSearchResult([]);
    setCurrentPage(1);
    setTotalPages(1);
    setIsModalOpen(false);
  };

  const handleDonorSelect = (donor: Donor) => {
    setSelectedDonor(donor);
    resetDonorSearch();
  };

  // 익명
  const handleCheckboxChange = () => {
    setAnonymityFlag((prev) => !prev);
  };

  // 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 유효성 검사
    // 추모자
    const letterWriter = letterWriterRef.current?.value.trim();
    if (!letterWriter) {
      alert("추모자 이름을 입력해 주세요.");
      return;
    }

    // 비밀번호
    const letterPasscode = letterPasscodeRef.current?.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!letterPasscode || !passwordRegex.test(letterPasscode)) {
      alert("비밀번호는 영문+숫자 조합의 8자 이상이어야 합니다.");
      return;
    }

    // 기증자
    if (!selectedDonor) {
      alert("기증자를 검색해 주세요.");
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
    formData.append("letterWriter", letterWriter);
    formData.append("anonymityFlag", anonymityFlag ? "Y" : "N");
    formData.append("letterPasscode", letterPasscode);
    formData.append("donorName", selectedDonor.donorName);
    formData.append("donateSeq", selectedDonor.donateSeq.toString());
    formData.append("letterTitle", letterTitle);
    formData.append("letterContents", letterContents);

    const url = isEdit ? `/heavenLetters/${letterSeq}` : "/heavenLetters";
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
      navigate(`${isEdit ? `/heavenLetters/letters-view/${letterSeq}` : "/heavenLetters/letters"}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isEdit) return;

    const fetchLetterDetail = async () => {
      try {
        const { data } = await instance.get(`/heavenLetters/${letterSeq}`);
        const letter = data.data;

        // 값 세팅
        letterWriterRef.current!.value = letter.letterWriter;
        letterTitleRef.current!.value = letter.letterTitle;
        setAnonymityFlag(letter.anonymityFlag === "Y");
        setSelectedDonor({
          donorName: letter.donorName,
          donateSeq: letter.donateSeq,
          donateDate: letter.donateDate,
          genderFlag: letter.genderFlag,
          donateAge: letter.donateAge,
        });
        setLetterContents(letter.letterContents);
      } catch (error) {
        console.error("편지 조회 실패:", error);
      }
    };

    fetchLetterDetail();
  }, [letterSeq]);

  useEffect(() => {
    if (!isEdit && location.state?.donateSeq && location.state?.donorName) {
      setSelectedDonor({
        donateSeq: location.state.donateSeq,
        donorName: location.state.donorName,
        donateDate: "",
        genderFlag: "",
        donateAge: 0,
      });
    }
  }, [isEdit, location.state]);

  return (
    <>
      <TopArea />
      <div className="m-auto max-w-[1280px] px-p10 pb-g12 pt-[76px] mobile:px-p6 mobile:pb-[60px] mobile:pt-[60px]">
        <Description
          startBefore="기증자에 대한 그리움과 사랑을 담은 '하늘나라 편지'는 언제 어디서나 시간과 장소에 제약을 받지 않고 추모를 할 수 있는 온라인 공간으로 익명 작성이 가능합니다."
          checkItems={[
            "기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 삭제 될 수 있습니다. 경건한 분위기에서 기증자분을 추모할수 있도록 많은 노력 부탁드립니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
            "하늘나라편지에 쓰신 글은 한국장기조직기증원 뉴스레터에 익명 표기와 뜻을 훼손하지 않는 범위의 수정을 통해 게재될 수 있습니다.",
          ]}
        />
        <PageTitle title={isEdit ? "하늘나라 편지 수정" : "하늘나라 편지 작성"} />
        <form onSubmit={handleSubmit}>
          <FormInfo />
          <ul className="mt-p6 flex flex-wrap justify-between border-t border-gray-40 mobile:mt-p9 mobile:gap-g6 mobile:pt-p9">
            <li className="flex w-[52%] items-center gap-g6 px-p8 pb-p7 pt-p10 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="name"
                children="추모자"
                weight="bold"
                color="dark"
                size="l"
                required
                className="min-w-[68px] whitespace-nowrap mobile:w-full"
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
            <li className="flex w-[55%] items-center gap-g6 px-p8 pb-p10 pt-p7 mobile:w-full mobile:flex-wrap mobile:gap-g4 mobile:p-0">
              <Label
                htmlFor="search"
                children="기증자"
                weight="bold"
                color="dark"
                size="l"
                required
                className="min-w-[68px] whitespace-nowrap mobile:w-full"
              />
              <TextInput
                id="search"
                height="large"
                placeholder="검색어를 입력해주세요."
                className="max-w-[400px] mobile:max-w-none mobile:flex-1"
                value={selectedDonor?.donorName || ""}
                onClick={() => setIsModalOpen(true)}
                readOnly
              />
              <Button
                variant="secondary"
                children="검색"
                className="mobile:ml-p2 mobile:whitespace-nowrap"
                onClick={() => setIsModalOpen(true)}
              />
              {isModalOpen && (
                <Modal type="basic" title="기증자 검색" onClose={resetDonorSearch}>
                  <ul className="flex flex-col gap-g5 mobile:gap-g4">
                    <li className="flex items-center gap-g6 mobile:flex-col mobile:items-baseline mobile:gap-g4">
                      <Label
                        htmlFor="search"
                        children="기증자명"
                        weight="bold"
                        color="dark"
                        size="l"
                      />
                      <TextInput
                        id="search"
                        height="large"
                        placeholder="성함을 입력해주세요."
                        className="max-w-[270px] mobile:w-full mobile:max-w-none"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                    </li>
                    <li className="flex items-center gap-g6 mobile:flex-wrap mobile:gap-g4">
                      <Label
                        htmlFor="search"
                        children="기증일"
                        weight="bold"
                        color="dark"
                        size="l"
                        className="min-w-[66px] mobile:w-full"
                        onClick={() => fromRef.current?.focus()}
                      />
                      <DatePicker range={range} onRangeChange={setRange} fromRef={fromRef} />
                      <Button
                        type="submit"
                        children="검색"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDonorSearch(1);
                        }}
                        className="mobile:w-full"
                      />
                    </li>
                  </ul>
                  <span className="mb-p5 mt-p6 block text-b-lg font-bold text-gray-90 mobile:mb-p6 mobile:mt-p9">
                    총 <b className="text-primary-60">{totalElements}</b>건
                  </span>
                  <Table
                    label="기증자 검색 결과"
                    data={searchResult}
                    columns={[
                      { key: "donorName", header: "기증자명" },
                      { key: "donateDate", header: "기증일" },
                      { key: "genderFlag", header: "성별" },
                      { key: "donateAge", header: "나이" },
                    ]}
                    onRowClick={handleDonorSelect}
                  />
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => {
                      handleDonorSearch(page);
                    }}
                    className="mt-p9"
                  />
                </Modal>
              )}
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
