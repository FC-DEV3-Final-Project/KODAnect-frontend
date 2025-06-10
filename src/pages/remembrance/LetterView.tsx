import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/remembrance/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";

function LetterView() {
  return (
    <div className="mx-auto max-w-[1200px] mobile:px-p6">
      <Description
        startBefore="기증자에 대한 그리움과 사랑은 담은 '하늘나라 편지'는 언제 어디서나 시간과 장소에 제약을 받지 않고 추모를 할 수 있는 온라인 공간으로 익명 작성이 가능합니다."
        checkItems={[
          "기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 삭제될 수 있습니다. 경건한 분위기에서 기증자분을 추모할 수 있도록 많은 노력 부탁드립니다.",
          "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
          "하늘나라편지에 쓰신 글은 한국장기조직기증원 뉴스레터에 익명 표기와 뜻을 훼손하지 않는 범위의 수정을 통해 게재될 수 있습니다.",
        ]}
      />
      <LetterContent />
      <CommentArea />
    </div>
  );
}

export default LetterView;
