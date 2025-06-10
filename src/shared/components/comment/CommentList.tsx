import { useState } from "react";
import CommentItem from "@/shared/components/comment/CommentItem";
import { Button } from "@/shared/components/Button";
import PlusIcon from "@/assets/icon/btn-more.svg?react";

const dummyComments = [
  {
    id: "1",
    content: "감사합니다.",
    date: "2025-05-14T09:00:00",
    author: "수혜자 아빠",
  },
  {
    id: "2",
    content: "감사합니다.",
    date: "2025-05-15T08:00:00",
    author: "수혜자 언니",
  },
  {
    id: "3",
    content: "감사합니다.",
    date: "2025-05-15T10:00:00",
    author: "수혜자 엄마",
  },
];

function CommentList() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      className="flex flex-col gap-g5 px-p10 mobile:px-0"
      aria-labelledby="comment-list-heading"
    >
      <h3 id="comment-list-heading" className="text-h-sm font-bold text-gray-90">
        등록된 댓글
        <span className="ml-[7px] text-b-md font-normal text-gray-70">{dummyComments.length}</span>
      </h3>

      <ul className="flex flex-col gap-g3" aria-label="댓글 목록">
        {[...dummyComments]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((item) => (
            <li key={item.id}>
              <CommentItem
                content={item.content}
                date={item.date}
                author={item.author}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            </li>
          ))}
      </ul>
      {dummyComments.length > 2 && (
        <div className="flex justify-center">
          <Button variant="secondary" size="medium" className="w-full" aria-label="댓글 더보기">
            <span className="text-b-md mobile:text-b-sm">더보기</span>
            <PlusIcon
              className="h-icon3 w-icon3 text-secondary-50 mobile:h-icon2 mobile:w-icon2"
              aria-hidden="true"
              focusable="false"
            />
          </Button>
        </div>
      )}
    </section>
  );
}

export default CommentList;
