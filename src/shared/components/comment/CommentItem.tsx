import OptionIcon from "@/assets/icon/ellipsis-vertical.svg?react";

const dropdownItems = ["수정", "삭제"];

type CommentItemProps = {
  content: string;
  date: string;
  author: string;
  isOpen: boolean;
  onToggle: () => void;
};

function CommentItem({ content, date, author, isOpen, onToggle }: CommentItemProps) {
  return (
    <article className="flex flex-col gap-g7 rounded-r6 border border-gray-30 px-6 py-p7">
      <div className="flex items-start justify-between">
        <p className="text-b-md text-gray-90 mobile:text-b-sm">{content}</p>
        <div className="relative">
          <button
            type="button"
            aria-label="댓글 옵션"
            onClick={onToggle}
            className="flex items-center justify-center"
          >
            <OptionIcon className="h-icon4 w-icon4 rotate-90 text-gray-60" />
          </button>

          {isOpen && (
            <ul className="absolute right-0 top-full z-10 mt-g2 w-[8.6rem] rounded-r3 border border-gray-30 bg-white p-p3 shadow-s1">
              {dropdownItems.map((label) => (
                <li
                  key={label}
                  className="flex cursor-pointer items-center justify-center px-p4 py-p3 text-b-sm text-gray-90 hover:bg-gray-10"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center gap-g2 text-b-sm text-gray-60 mobile:text-b-xs">
        <span>{date?.slice(0, 10)}</span>
        <span className="px-p5 text-gray-40">|</span>
        <span>{author}</span>
      </div>
    </article>
  );
}

export default CommentItem;
