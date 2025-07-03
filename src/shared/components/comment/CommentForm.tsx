import { useState, useReducer, useEffect } from "react";
import { useCommentContext } from "@/shared/context/CommentContext";

import type {
  Comment as CommentType,
  CreateCommentPayload,
} from "@/shared/api/recipient-view/comment/types";

import TextInput from "@/shared/components/TextInput";
import TextArea from "@/shared/components/Textarea";
import Captcha from "@/shared/components/Captcha";
import Button from "@/shared/components/Button";
import { validateCaptcha } from "react-simple-captcha";

interface CommentFormProps {
  onCommentSubmit?: (newComment: CommentType) => void; // 등록된 댓글 콜백
}

type FormState = Pick<CreateCommentPayload, "commentWriter" | "contents" | "commentPasscode">;

// 액션 정리
type FormAction = { type: "SET_FIELD"; field: keyof FormState; value: string } | { type: "RESET" };

const initialState: FormState = {
  commentWriter: "",
  commentPasscode: "",
  contents: "",
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

function CommentForm({ onCommentSubmit }: CommentFormProps) {
  const { letterId, variant, editingComment, createComment, updateComment } = useCommentContext();
  const [isVisible, setIsVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputCaptcha, setInputCaptcha] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateCaptcha(inputCaptcha)) {
      alert("자동입력 방지 숫자가 일치하지 않습니다.");
      return;
    }

    try {
      if (editingComment) {
        //  댓글 수정
        await updateComment(letterId, editingComment.commentSeq, {
          commentWriter: state.commentWriter,
          contents: state.contents,
        });
        alert("댓글이 수정되었습니다.");

        onCommentSubmit?.({
          ...editingComment,
          commentWriter: state.commentWriter,
          contents: state.contents,
          modifyTime: new Date().toISOString(),
        });
      } else {
        // 댓글 등록
        await createComment({
          ...(variant === "default"
            ? { letterSeq: letterId }
            : variant === "memorial"
              ? { donateSeq: letterId }
              : { storySeq: letterId }),
          commentWriter: state.commentWriter,
          contents: state.contents,
          commentPasscode: state.commentPasscode,
        });
        alert("댓글이 등록되었습니다.");
        window.location.reload();
      }

      dispatch({ type: "RESET" });
      setInputCaptcha("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  useEffect(() => {
    if (editingComment) {
      dispatch({ type: "SET_FIELD", field: "commentWriter", value: editingComment.commentWriter });
      dispatch({ type: "SET_FIELD", field: "contents", value: editingComment.contents });
    }
  }, [editingComment]);

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
            value={state.commentWriter}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "commentWriter", value: e.target.value })
            }
            autoComplete="username"
          />
        </div>
        <div className="w-full">
          <TextInput
            id="password"
            title="비밀번호"
            height="medium"
            placeholder="영문, 숫자 8자 이상"
            type={isVisible ? "text" : "password"}
            iconToggle={!editingComment}
            isVisible={isVisible}
            value={state.commentPasscode}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "commentPasscode", value: e.target.value })
            }
            onToggleIconClick={() => setIsVisible((prev) => !prev)}
            disabled={!!editingComment}
          />
        </div>
      </fieldset>

      <div className="h-[18.5rem] w-full">
        <TextArea
          id="content"
          title="내용"
          placeholder="기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 관리자에 의해 삭제 될 수 있습니다."
          maxLength={100}
          value={state.contents}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "contents", value: e.target.value })
          }
          autoComplete="new-password"
        />
      </div>

      <fieldset className="flex flex-col gap-g3" aria-labelledby="captcha-heading">
        <label id="captcha-heading" className="text-b-md text-gray-70 mobile:text-b-sm">
          자동입력 방지
        </label>
        <div className="flex w-full flex-row mobile:flex-col mobile:gap-g3">
          <Captcha value={inputCaptcha} onChange={setInputCaptcha} />
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="mobile:max-w-[9.1rem] mobile:self-end"
          >
            {editingComment ? "수정하기" : "추모하기"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

export default CommentForm;
