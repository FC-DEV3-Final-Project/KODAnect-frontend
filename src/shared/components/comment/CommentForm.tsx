import { useState, useReducer } from "react";
import TextInput from "@/shared/components/TextInput";
import TextArea from "@/shared/components/Textarea";
import ResetIcon from "@/assets/icon/reset.svg?react";
import SoundIcon from "@/assets/icon/sound.svg?react";
import { Button } from "@/shared/components/Button";

// 상태 정의
type FormState = {
  writer: string;
  password: string;
  content: string;
};

// 액션 정리
type FormAction = { type: "SET_FIELD"; field: keyof FormState; value: string } | { type: "RESET" };

const initialState: FormState = {
  writer: "",
  password: "",
  content: "",
};

// reducer 함수
function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function CommentForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      dispatch({ type: "RESET" });
      console.log("댓글 등록 완료");
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="comment-form-heading"
      className="flex h-auto w-full flex-col gap-g5 rounded-r6 bg-gray-5 px-p10 py-p8 mobile:p-p6"
    >
      {/* 폼 제목: 스크린리더용 */}
      <h3 id="comment-form-heading" className="sr-only">
        댓글 작성 폼
      </h3>

      <fieldset className="flex max-w-[48.5rem] flex-row gap-g7 mobile:flex-col">
        <legend className="sr-only">작성자 정보</legend>
        <div className="w-full">
          <TextInput
            id="writer"
            title="추모자"
            height="medium"
            placeholder="한글/ 영문만 입력"
            value={state.writer}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "writer", value: e.target.value })
            }
          />
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
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
            }
            onToggleIconClick={() => setIsVisible((prev) => !prev)}
          />
        </div>
      </fieldset>

      <div className="h-[18.5rem] w-full">
        <TextArea
          id="content"
          title="내용"
          placeholder="기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 관리자에 의해 삭제 될 수 있습니다."
          maxLength={100}
          value={state.content}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "content", value: e.target.value })}
        />
      </div>

      <fieldset className="flex flex-col gap-g3" aria-labelledby="captcha-heading">
        <label id="captcha-heading" className="text-b-md text-gray-70 mobile:text-b-sm">
          자동입력 방지
        </label>

        <div className="flex w-full flex-row mobile:flex-col mobile:gap-g3">
          {/* 좌측 영역 */}
          <div className="flex w-full flex-1 items-center gap-g3 mobile:flex-col mobile:items-start">
            <div className="flex items-center gap-g3">
              <div className="h-[48px] w-[211px] bg-gray-60 mobile:w-[183px]"></div>

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
            </div>

            <div className="min-w-[29.6rem] mobile:w-full">
              <TextInput
                id="captcha"
                placeholder="자동입력 방지 숫자 입력"
                height="medium"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* 우측 버튼 영역 */}
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="mobile:max-w-[9.1rem] mobile:self-end"
          >
            추모하기
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

export default CommentForm;
