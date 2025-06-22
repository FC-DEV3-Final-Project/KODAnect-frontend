import { useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

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
import { withData } from "@/shared/utils/withData";

export default function MembersView() {
  const { donateSeq } = useParams();

  const {
    data: donor,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["memberDetail", donateSeq],
    queryFn: () => getMemberDetail(Number(donateSeq)),
    enabled: !!donateSeq,
  });

  const [optimisticDonor, setOptimisticDonor] = useState(donor ?? null);

  useEffect(() => {
    if (donor) {
      setOptimisticDonor(donor);
    }
  }, [donor]);
  // 이모지 클릭 이벤트 핸들러
  const handleEmotionClick = useCallback(
    async (emotion: EmotionType) => {
      if (!donateSeq || !donor) return;
      try {
        await patchEmotionCount(Number(donateSeq), emotion);

        // 낙관적 업데이트 (UI 즉시 반영)
        setOptimisticDonor((prev) => {
          if (!prev) return prev;
          const key = emotionCountKeys[emotion];
          return {
            ...prev,
            [key]: (prev[key] as number) + 1,
          };
        });

        // refetch로 동기화
        refetch();
      } catch (e) {
        console.error("이모지 업데이트 실패", e);
      }
    },
    [donateSeq, refetch],
  );

  const emotionCountKeys: Record<EmotionType, keyof MemberDetail> = {
    flower: "flowerCount",
    love: "loveCount",
    see: "seeCount",
    miss: "missCount",
    proud: "proudCount",
    hard: "hardCount",
    sad: "sadCount",
  };

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS} />
        {isLoading ? (
          <p className="mt-10 text-center">불러오는 중입니다...</p>
        ) : error ? (
          <p className="mt-10 text-center text-red-500">기증자 정보를 불러오지 못했습니다.</p>
        ) : donor ? (
          <>
            <TributeArea donor={optimisticDonor ?? donor} />
            <CommentArea
              variant="memorial"
              initialCommentData={donor.memorialCommentResponses}
              letterId={Number(donor.donateSeq)}
              createComment={(payload) => withData(createComment(payload))}
              updateComment={(donateSeq, commentId, payload) =>
                withData(updateComment(donateSeq, commentId, payload))
              }
              verifyComment={(donateSeq, commentId, payload) =>
                withData(verifyComment(donateSeq, commentId, payload))
              }
              deleteComment={(donateSeq, commentId, payload) =>
                withData(deleteComment(donateSeq, commentId, payload))
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
