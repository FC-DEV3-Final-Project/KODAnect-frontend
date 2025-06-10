import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/remembrance/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { StoryLetter } from "@/features/remembrance/letter-view/components/mockLetter";

function StoryView() {
  const handleCommentEdit = (commentId: string) => {
    console.log("댓글 수정:", commentId);
    // 수정 로직 (예: 모달 열기 등)
  };

  const handleCommentDelete = (commentId: string) => {
    console.log("댓글 삭제:", commentId);
    // 삭제 확인 후 API 호출 등
  };
  return (
    <div className="mx-auto max-w-[1200px] mobile:px-p6">
      <Description
        startBefore="한국장기조직기증원 장기구득 코디네이터가 함께 한 영원히 기억되는 기증자의 숭고한 나눔의 순간과 아름다운 이야기를 적는 공간입니다."
        checkItems={[
          "KODA 장기구득 코디네이터들의 공간입니다.",
          "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하 여 주시기 바랍니다.",
        ]}
      />
      <LetterContent
        title={StoryLetter.title}
        content={StoryLetter.content}
        onGoList={() => console.log("목록 페이지로 이동")}
        infoItems={StoryLetter.infoItems}
        onEdit={() => console.log("편지 수정")}
        onDelete={() => console.log("편지 삭제")}
      />
      <CommentArea
        onCommentSubmit={() => console.log("댓글 등록!")}
        onCommentEdit={handleCommentEdit}
        onCommentDelete={handleCommentDelete}
      />
    </div>
  );
}

export default StoryView;
