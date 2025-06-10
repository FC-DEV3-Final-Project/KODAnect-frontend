import CommentForm from "@/shared/components/comment/CommentForm";
import CommentList from "@/shared/components/comment/CommentList";

type CommentAreaProps = {
  onCommentSubmit?: () => void;
  onCommentEdit?: (commentId: string) => void;
  onCommentDelete?: (commentId: string) => void;
};

function CommentArea({ onCommentEdit, onCommentDelete }: CommentAreaProps) {
  return (
    <section className="mx-auto h-full w-full max-w-[1200px]" aria-labelledby="comment-heading">
      <div className="mb-6 gap-g3">
        <h2 id="comment-heading" className="text-h-md font-bold text-gray-90">
          댓글
        </h2>
        <span className="text-b-md text-gray-70 mobile:text-b-sm">
          기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 관리자에 의해 삭제 될
          수 있습니다.
        </span>
      </div>
      <div className="mb-g9">
        <CommentForm
          onSubmit={() => {
            // 댓글 등록 API 호출 또는 유효성 검사 등 처리
            console.log("댓글 제출됨");
          }}
        />
      </div>
      <CommentList onEdit={onCommentEdit} onDelete={onCommentDelete} />
    </section>
  );
}

export default CommentArea;
