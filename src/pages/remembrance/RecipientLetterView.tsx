import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/remembrance/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { recipientLetter } from "@/features/remembrance/letter-view/components/mockLetter";

function RecipientLetterView() {
  return (
    <div className="mx-auto max-w-[1200px] mobile:px-p6">
      <Description
        startBefore="수혜자 편지는 이식으로 새생명을 살고 있는 분들의 이야기입니다. 언제 어디서나 시간과 장소에 구애받지 않고, 익명으로 작성이 가능합니다."
        checkItems={[
          "생명을 나눠준 기증자에 대한 예의를 지켜주시고 존중해주시기 바랍니다.",
          "비방이나 욕설 등 분위기를 해치는 내용은 작성자에 의해 임의 삭제될 수 있습니다.",
          "개인정보 노출을 자제해주세요.",
          "이 게시판에 올린 글은 한국장기조직기증원 뉴스레터에 원문의 의미를 훼손하지 않는 범위내에서 교정을 거쳐 임의 수록할 수 있음을 양지하시기 바랍니다.",
        ]}
      />
      <LetterContent
        title={recipientLetter.title}
        content={recipientLetter.content}
        onGoList={() => console.log("목록 페이지로 이동")}
        infoItems={recipientLetter.infoItems}
        onEdit={() => console.log("편지 수정")}
        onDelete={() => console.log("편지 삭제")}
      />
      <CommentArea />
    </div>
  );
}

export default RecipientLetterView;
