import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

import Description from "@/shared/components/Description";
import { START_BEFORE, CHECK_ITEMS } from "@/shared/constant/recipients-view";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import TopArea from "@/shared/components/TopArea";
import { getRecipientInfoItems } from "@/features/recipient-view/utils/getRecipientInfoItems";
import { Modal } from "@/shared/components/Modal";
import { withData } from "@/shared/utils/withData";

export default function RecipientView() {
  const { letterSeq } = useParams<{ letterSeq: string }>();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");

  const {
    data: letter,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipientLetterDetail", letterSeq],
    queryFn: () => getLetterDetail(Number(letterSeq)),
    enabled: !!letterSeq,
    select: (res) => res.data.data,
  });

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS} />
        {isLoading ? (
          <p className="mt-10 text-center">불러오는 중...</p>
        ) : error ? (
          <p className="mt-10 text-center text-red-500">편지 정보를 불러오지 못했습니다.</p>
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
              createComment={(payload) => withData(createComment(payload))}
              updateComment={(letterId, commentId, payload) =>
                withData(updateComment(letterId, commentId, payload))
              }
              verifyComment={(letterId, commentId, payload) =>
                withData(verifyComment(letterId, commentId, payload))
              }
              deleteComment={(letterId, commentId, payload) =>
                withData(deleteComment(letterId, commentId, payload))
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
                  if (!letterSeq || !letter) return;

                  try {
                    if (modalType === "edit") {
                      await verifyLetter(Number(letterSeq), { letterPasscode: password });
                      console.log("수정 페이지로 전달할 데이터:", letter);
                      navigate(`/remembrance/recipients-form/${letter.letterSeq}`, {
                        state: letter,
                      });
                    } else {
                      console.log("전달되는 비밀번호:", password);

                      await deleteLetter(Number(letterSeq), { letterPasscode: password });
                      navigate(`/remembrance/recipients`);
                    }
                  } catch (err) {
                    alert("비밀번호가 올바르지 않거나 삭제에 실패했습니다.");
                  } finally {
                    setModalType(null);
                    setPassword("");
                  }
                }}
                confirmText={modalType === "edit" ? "수정" : "삭제"}
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
