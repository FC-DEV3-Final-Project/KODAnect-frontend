import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getHeavenLetterDetail,
  verifyHeavenLetter,
  deleteHeavenLetter,
} from "@/shared/api/letter-view/letter/letterApi";
import {
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
  getMoreComments,
} from "@/shared/api/letter-view/comment/commentApi";

import Description from "@/shared/components/Description";
import { START_BEFORE, CHECK_ITEMS } from "@/shared/constant/letters-view";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import TopArea from "@/shared/components/TopArea";
import { getHeavenInfoItems } from "@/features/letter-view/utils/getHeavenInfoItems";
import { Modal } from "@/shared/components/Modal";
import { withData } from "@/shared/utils/withData";

export default function LetterView() {
  const { letterSeq } = useParams<{ letterSeq: string }>();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");

  const {
    data: letter,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["heavenLetterDetail", letterSeq],
    queryFn: () => getHeavenLetterDetail(Number(letterSeq)),
    enabled: !!letterSeq,
    select: (res) => res.data.data,
  });

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1200px] px-p10 mobile:min-w-[360px] mobile:px-p6">
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
              infoItems={getHeavenInfoItems(letter)}
              imageUrl={letter.fileName}
              onGoList={() => navigate(`/remembrance/letters`)}
              onEdit={() => setModalType("edit")}
              onDelete={() => setModalType("delete")}
              mobileWidth="6rem"
            />

            <CommentArea
              variant="default"
              initialCommentData={letter.cursorCommentPaginationResponse}
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
                      await verifyHeavenLetter(Number(letterSeq), { letterPasscode: password });
                      console.log("수정 페이지로 전달할 데이터:", letter);
                      navigate(`/remembrance/letters-form/${letter.letterSeq}`, { state: letter });
                    } else {
                      await deleteHeavenLetter(Number(letterSeq), { letterPasscode: password });
                      navigate(`/remembrance/letters`);
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
