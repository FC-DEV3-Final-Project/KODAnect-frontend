type NewBadgeProps = {
  donateDate: string;
};

export const NewBadge = ({ donateDate }: NewBadgeProps) => {
  const now = new Date();
  const donated = new Date(donateDate);
  const diffDays = (now.getTime() - donated.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays > 7) return null;

  return (
    <span className="absolute right-[16px] top-[16px] rounded-r3 mobile:rounded-r2 bg-primary-5 px-p3 py-p1 text-b-sm text-primary-60 mobile:right-[12px] mobile:top-[12px] mobile:px-p2 mobile:py-0 mobile:text-b-xs">
      N
    </span>
  );
};
