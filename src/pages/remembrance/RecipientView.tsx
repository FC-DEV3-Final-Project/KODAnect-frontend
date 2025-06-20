import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getLetterDetail,
  verifyLetter,
  deleteLetter,
} from "@/shared/api/recipient-view/letter/letterApi";
import {
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
  getMoreComments,
} from "@/shared/api/recipient-view/comment/commentApi";

import type { RecipientLetterDetail } from "@/shared/api/recipient-view/letter/types";

import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { TopArea } from "@/shared/components/TopArea";
import { getRecipientInfoItems } from "@/features/recipient-view/utils/getRecipientInfoItems";
import { Modal } from "@/shared/components/Modal";

function RecipientView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");

  const [letter, setLetter] = useState<RecipientLetterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchLetter = async () => {
      try {
        setIsLoading(true);
        const response = await getLetterDetail(Number(id));

        const letterData = response.data.data;
        console.log("전체 편지 응답:", letterData);
        console.log("imageUrl 확인:", letterData.imageUrl);
        setLetter(response.data.data);
      } catch (err) {
        console.error("에러 발생:", err);
        setError("편지 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetter();
  }, [id]);

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description
          startBefore="수혜자 편지는 이식으로 새생명을 살고 있는 분들의 이야기입니다. 언제 어디서나 시간과 장소에 구애받지 않고, 익명으로 작성이 가능합니다."
          checkItems={[
            "생명을 나눠준 기증자에 대한 예의를 지켜주시고 존중해주시기 바랍니다.",
            "비방이나 욕설 등 분위기를 해치는 내용은 작성자에 의해 임의 삭제될 수 있습니다.",
            "개인정보 노출을 자제해주세요.",
            "이 게시판에 올린 글은 한국장기조직기증원 뉴스레터에 원문의 의미를 훼손하지 않는 범위내에서 교정을 거쳐 임의 수록할 수 있음을 양지하시기 바랍니다.",
          ]}
        />
        {isLoading ? (
          <p className="mt-10 text-center">불러오는 중...</p>
        ) : error ? (
          <p className="mt-10 text-center text-red-500">{error}</p>
        ) : letter ? (
          <>
            <LetterContent
              title={letter.letterTitle}
              content={letter.letterContents}
              infoItems={getRecipientInfoItems(letter)}
              imageUrl={letter.imageUrl}
              onGoList={() => navigate(`/remembrance/recipients`)}
              onEdit={() => setModalType("edit")}
              onDelete={() => setModalType("delete")}
              mobileWidth="10rem"
            />

            <CommentArea
              variant="default"
              initialCommentData={letter.initialCommentData}
              letterId={letter.letterSeq}
              // axios 응답 전체를 반환하는게 아니라 data만 꺼내서 반환해야하기 때문
              createComment={(payload) => createComment(payload).then((res) => res.data)}
              updateComment={(letterId, commentId, payload) =>
                updateComment(letterId, commentId, payload).then((res) => res.data)
              }
              verifyComment={(letterId, commentId, payload) =>
                verifyComment(letterId, commentId, payload).then((res) => res.data)
              }
              deleteComment={(letterId, commentId, payload) =>
                deleteComment(letterId, commentId, payload).then((res) => res.data)
              }
              getMoreComments={(cursor, size = 3) =>
                getMoreComments({ letterSeq: letter.letterSeq, cursor, size })
              }
            />

            {modalType && (
              <Modal
                type="input"
                title="비밀번호 확인"
                placeholder="비밀번호를 입력하세요"
                password={password}
                setPassword={setPassword}
                onClose={() => {
                  setModalType(null);
                  setPassword("");
                }}
                onSubmit={async () => {
                  if (!id || !letter) return;

                  try {
                    if (modalType === "edit") {
                      await verifyLetter(Number(id), { letterPasscode: password });
                      console.log("수정 페이지로 전달할 데이터:", letter);
                      navigate(`/remembrance/recipients-form/${letter.letterSeq}`, {
                        state: letter,
                      });
                    } else {
                      console.log("전달되는 비밀번호:", password);

                      await deleteLetter(Number(id), { letterPasscode: password });
                      navigate(`/remembrance/recipients`);
                    }
                  } catch (err) {
                    alert("비밀번호가 올바르지 않거나 삭제에 실패했습니다.");
                  } finally {
                    setModalType(null);
                    setPassword("");
                  }
                }}
              />
            )}
          </>
        ) : (
          <p className="mt-10 text-center">편지를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default RecipientView;
