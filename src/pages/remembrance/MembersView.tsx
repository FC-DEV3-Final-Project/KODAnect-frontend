import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { throttle } from "lodash";

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
import TributeArea from "@/features/members/component/TributeArea";
import CommentArea from "@/shared/components/comment/CommentArea";
import HeavenLetterList from "@/features/members-view/component/HeavenLetterList";

export default function MembersView() {
  const { donateSeq } = useParams();

  const [donor, setDonor] = useState<MemberDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        console.log("더보기 여부:", data.memorialCommentResponses?.commentHasNext);
      } catch (err) {
        console.error("기증자 상세 조회 실패:", err);
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
      if (!donor) return;
      try {
        await patchEmotionCount(donor.donateSeq, emotion);

        setDonor((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            [`${emotion}Count`]: (prev as any)[`${emotion}Count`] + 1,
          };
        });
      } catch (e) {
        console.error("이모지 업데이트 실패", e);
      }
    },
    [donor],
  );

  const throttledEmotionClick = useCallback(() => {
    return throttle(handleEmotionClick, 2000); // 2초 제한
  }, [handleEmotionClick]);

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description
          startBefore="생명을 나눈 고귀한 사랑을 기억하는 공간, 기증자 추모관은 장기기증자분들께 감사와 추모의 마음을 전달할 수 있는 온라인 추모 공간입니다."
          checkItems={[
            "기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 삭제 될 수 있습니다. 경건한 분위기에서 기증자분을 추모할 수 있도록 많은 노력 부탁드립니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
            "<기증자 가족 안내> 한국장기조직기증원에서는 기증자 가족, 수혜자, 한국장기조직기증원 코디네이터 및 임직원의 이야기를 모은 여섯 번째 생명나눔 사례집 <별이 빛나는 밤에>를 출간하였습니다.",
            "도서를 직접 받아보고 싶은 분은 대외 협력팀(02-765-8736)으로 연락주시거나 신청서(링크)를 작성하여 주세요.",
          ]}
        />
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
              onClickEmotion={throttledEmotionClick}
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
            />
          </>
        ) : (
          <p className="mt-10 text-center">기증자 정보를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
