import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getMemberDetail, patchEmotionCount } from "@/shared/api/members-view/member/memberApi";
import type { EmotionType, MemberDetail } from "@/shared/api/members-view/member/types";

import {
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
  getMoreComments,
} from "@/shared/api/members-view/comment/commentApi";

import TopArea from "@/shared/components/TopArea";
import Description from "@/shared/components/Description";
import { START_BEFORE, CHECK_ITEMS } from "@/shared/constant/members";
import TributeArea from "@/features/remembrance/members-view/component/TributeArea";
import CommentArea from "@/shared/components/comment/CommentArea";
import HeavenLetterList from "@/features/remembrance/members-view/component/HeavenLetterList";
import { withData } from "@/shared/utils/withData";
import { EMOTION_COUNT_KEYS } from "@/shared/constant/emotion";

import SkeletonTributeArea from "@/shared/components/skeleton/membersView/SkeletonTributeArea";
import SkeletonHeavenLetterList from "@/shared/components/skeleton/membersView/SkeletonHeavenLetterList";
import SkeletonCommentArea from "@/shared/components/skeleton/membersView/SkeletonCommentArea";

export default function MembersView() {
  const { donateSeq } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: donor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberDetail", donateSeq],
    queryFn: () => getMemberDetail(Number(donateSeq)),
    enabled: !!donateSeq,
  });

  // useMutation으로 낙관적 업데이트
  const emotionMutation = useMutation({
    mutationFn: (emotion: EmotionType) => patchEmotionCount(Number(donateSeq), emotion),

    // 낙관적 업데이트 (UI 먼저 반영)
    onMutate: async (emotion) => {
      await queryClient.cancelQueries({ queryKey: ["memberDetail", donateSeq] });

      const previousData = queryClient.getQueryData(["memberDetail", donateSeq]);

      // 캐시된 데이터에 count + 1 증가
      queryClient.setQueryData<MemberDetail>(["memberDetail", donateSeq], (old) => {
        if (!old) return old;
        const key = EMOTION_COUNT_KEYS[emotion];
        return {
          ...old,
          [key]: (old[key] as number) + 1,
        };
      });

      return { previousData };
    },

    onError: (_err, _emotion, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["memberDetail", donateSeq], context.previousData);
      }
    },

    // 요청 성공, 실패 상관 없이 실행 -> 서버와 데이터 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["memberDetail", donateSeq] });
    },
  });

  const handleEmotionClick = useCallback(
    (emotion: EmotionType) => {
      if (!donateSeq) return;
      emotionMutation.mutate(emotion);
    },
    [donateSeq, emotionMutation],
  );

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS} />
        {isLoading ? (
          <>
            <SkeletonTributeArea />
            <SkeletonCommentArea />
            <SkeletonHeavenLetterList />
          </>
        ) : donor ? (
          <>
            <TributeArea donor={donor} />
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
