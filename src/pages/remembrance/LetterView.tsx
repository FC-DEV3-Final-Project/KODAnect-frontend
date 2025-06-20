import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getHeavenLetterDetail,
  verifyHeavenLetter,
  deleteHeavenLetter,
} from "@/shared/api/letter-view/letter/letterApi";
import type { HeavenLetterDetail } from "@/shared/api/letter-view/letter/types";
import {
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
  getMoreComments,
} from "@/shared/api/letter-view/comment/commentApi";

import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { TopArea } from "@/shared/components/TopArea";
import { getHeavenInfoItems } from "@/features/letter-view/utils/getHeavenInfoItems";
import { Modal } from "@/shared/components/Modal";

function LetterView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");
  const [letter, setLetter] = useState<HeavenLetterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (letter) {
      console.log("📦 전체 편지 데이터:", letter);
      console.log("👤 기증자 donorName:", letter.donorName);
    }
  }, [letter]);

  useEffect(() => {
    if (!id) return;

    const fetchLetter = async () => {
      try {
        setIsLoading(true);
        const response = await getHeavenLetterDetail(Number(id));
        setLetter(response.data.data);
      } catch (err) {
        console.error(err);
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
      <div className="mx-auto mt-[76px] max-w-[1200px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description
          startBefore="기증자에 대한 그리움과 사랑은 담은 '하늘나라 편지'는 언제 어디서나 시간과 장소에 제약을 받지 않고 추모를 할 수 있는 온라인 공간으로 익명 작성이 가능합니다."
          checkItems={[
            "기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 삭제될 수 있습니다. 경건한 분위기에서 기증자분을 추모할 수 있도록 많은 노력 부탁드립니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
            "하늘나라편지에 쓰신 글은 한국장기조직기증원 뉴스레터에 익명 표기와 뜻을 훼손하지 않는 범위의 수정을 통해 게재될 수 있습니다.",
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
                      await verifyHeavenLetter(Number(id), { letterPasscode: password });
                      navigate(`/remembrance/letters/edit/${id}`, { state: letter });
                    } else {
                      await deleteHeavenLetter(Number(id), { letterPasscode: password });
                      navigate(`/remembrance/letters`);
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

export default LetterView;
