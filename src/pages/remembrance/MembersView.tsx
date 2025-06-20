import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import { getMemberDetail, patchEmotionCount } from "@/shared/api/members-view/member/memberApi";
import type { MemberDetail, EmotionType } from "@/shared/api/members-view/member/types";

import {
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
  getMoreComments,
} from "@/shared/api/members-view/comment/commentApi";

import { TopArea } from "@/shared/components/TopArea";
import { Description } from "@/shared/components/Description";
import { START_BEFORE, CHECK_ITEMS } from "@/shared/constant/members-view";
import TributeArea from "@/features/members/component/TributeArea";
import CommentArea from "@/shared/components/comment/CommentArea";
import HeavenLetterList from "@/features/members-view/component/HeavenLetterList";

export default function MembersView() {
  const { donateSeq } = useParams();

  const [donor, setDonor] = useState<MemberDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const emotionCountKeys: Record<EmotionType, keyof MemberDetail> = {
    flower: "flowerCount",
    love: "loveCount",
    see: "seeCount",
    miss: "missCount",
    proud: "proudCount",
    hard: "hardCount",
    sad: "sadCount",
  };

  useEffect(() => {
    if (!donateSeq) {
      setIsLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getMemberDetail(Number(donateSeq));
        setDonor(data);
      } catch (err) {
        setError("기증자 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [donateSeq]);

  // 이모지 클릭 이벤트 핸들러 & throttle 위해 useCallback 적용
  const handleEmotionClick = useCallback(
    async (emotion: EmotionType) => {
      if (!donateSeq) return;
      try {
        await patchEmotionCount(Number(donateSeq), emotion);

        setDonor((prev) => {
          if (!prev) return prev;
          const countKey = emotionCountKeys[emotion];
          return {
            ...prev,
            [countKey]: (prev[countKey] as number) + 1,
          };
        });
      } catch (e) {
        console.error("이모지 업데이트 실패", e);
      }
    },
    [donateSeq],
  );

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS} />
        {isLoading ? (
          <p className="mt-10 text-center">불러오는 중입니다...</p>
        ) : error ? (
          <p className="mt-10 text-center text-red-500">{error}</p>
        ) : donor ? (
          <>
            <TributeArea donor={donor} />
            <CommentArea
              variant="memorial"
              initialCommentData={donor.memorialCommentResponses}
              letterId={donor.donateSeq}
              createComment={(payload) => createComment(payload).then((res) => res.data)}
              updateComment={(donateSeq, commentId, payload) =>
                updateComment(donateSeq, commentId, payload).then((res) => res.data)
              }
              verifyComment={(donateSeq, commentId, payload) =>
                verifyComment(donateSeq, commentId, payload).then((res) => res.data)
              }
              deleteComment={(donateSeq, commentId, payload) =>
                deleteComment(donateSeq, commentId, payload).then((res) => res.data)
              }
              getMoreComments={(cursor, size = 3) =>
                getMoreComments({ donateSeq: donor.donateSeq, cursor, size })
              }
              onClickEmotion={handleEmotionClick}
              emotionCounts={{
                flower: donor.flowerCount,
                love: donor.loveCount,
                see: donor.seeCount,
                miss: donor.missCount,
                proud: donor.proudCount,
                hard: donor.hardCount,
                sad: donor.sadCount,
              }}
            />
            <HeavenLetterList
              donateSeq={donor.donateSeq}
              initialData={donor.heavenLetterResponses}
              donorName={donor.donorName}
            />
          </>
        ) : (
          <p className="mt-10 text-center">기증자 정보를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
