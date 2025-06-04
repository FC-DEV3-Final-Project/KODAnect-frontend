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
  const dropdownId = `comment-dropdown-${author}-${date}`;

  return (
    <article className="flex flex-col gap-g7 rounded-r6 border border-gray-30 px-6 py-p7 mobile:gap-g4 mobile:p-p6">
      <div className="flex items-start justify-between">
        <p className="text-b-md text-gray-90 mobile:text-b-sm">{content}</p>
        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls={dropdownId}
            aria-label="댓글 옵션 열기"
            onClick={onToggle}
            className="flex items-center justify-center"
          >
            <OptionIcon className="h-icon4 w-icon4 rotate-90 text-gray-60" />
          </button>

          {isOpen && (
            <ul className="absolute left-1/2 top-full z-10 mt-g2 w-[8.6rem] -translate-x-1/2 rounded-r3 border border-gray-30 bg-white p-p3 shadow-s1">
              {dropdownItems.map((label, idx) => (
                <li
                  key={`${label}-${idx}`}
                  role="menuitem"
                  tabIndex={0}
                  className="flex cursor-pointer items-center justify-center px-p4 py-p3 text-b-sm text-gray-90 hover:rounded-r3 hover:bg-secondary-5 active:bg-secondary-10"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center text-b-sm text-gray-60 mobile:text-b-xs">
        <time className="relative pr-p5 after:absolute after:right-0 after:top-1/2 after:h-[16px] after:w-[1px] after:-translate-y-1/2 after:bg-gray-20 after:content-['']">
          {date?.slice(0, 10)}
        </time>
        <span className="ml-p5">{author}</span>
      </div>
    </article>
  );
}

export default CommentItem;
