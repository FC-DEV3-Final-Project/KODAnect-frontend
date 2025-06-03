import { useState } from "react";
import TextInput from "@/shared/components/TextInput";
import TextArea from "@/shared/components/Textarea";
import ResetIcon from "@/assets/icon/reset.svg?react";
import SoundIcon from "@/assets/icon/sound.svg?react";
import { Button } from "@/shared/components/Button";

function CommentForm() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <form
      aria-label="댓글 작성 폼"
      className="flex h-auto w-full flex-col gap-g5 rounded-r6 bg-gray-5 px-p10 py-p8"
    >
      <div className="md:flex-row flex max-w-[48.5rem] flex-col gap-g7">
        <div className="w-full">
          <TextInput id="writer" title="추모자" height="medium" placeholder="한글/ 영문만 입력" />
        </div>
        <div className="w-full">
          <TextInput
            id="password"
            title="비밀번호"
            height="medium"
            placeholder="영문, 숫자 8자 이상"
            type={isVisible ? "text" : "password"}
            iconToggle
            isVisible={isVisible}
            onToggleIconClick={() => setIsVisible((prev) => !prev)}
          />
        </div>
      </div>

      <div className="h-[18.5rem] w-full">
        <TextArea
          id="content"
          title="내용"
          placeholder="기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 관리자에 의해 삭제 될 수 있습니다."
          maxLength={100}
        />
      </div>

      <div>
        <label className="text-b-md text-gray-70 mobile:text-b-sm">자동입력 방지</label>

        <div className="md:flex-row md:items-center flex w-full flex-col">
          {/* 좌측 영역 */}
          <div className="flex w-full flex-1 items-center gap-g3">
            <div className="h-[48px] w-[211px] bg-gray-60"></div>

            <button
              type="button"
              aria-label="자동입력 음성 듣기"
              className="flex h-[48px] w-[48px] items-center justify-center rounded-r3 border border-gray-60 bg-white"
            >
              <SoundIcon className="h-icon4 w-icon4" />
            </button>
            <button
              type="button"
              aria-label="자동입력 새로고침"
              className="flex h-[48px] w-[48px] items-center justify-center rounded-r3 border border-gray-60 bg-white"
            >
              <ResetIcon className="h-icon4 w-icon4 text-gray-40" />
            </button>
            <div className="min-w-[26.4rem]">
              <TextInput
                id="captcha"
                placeholder="자동입력 방지 숫자 입력"
                height="medium"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* 우측 버튼 영역 */}
          <Button type="submit" variant="primary" size="medium" className="mobile:max-w-[9.1rem]">
            등록하기
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
