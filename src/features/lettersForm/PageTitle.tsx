interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="mb-p2 mt-g11 text-h-lg font-bold text-gray-90 mobile:mb-p3 mobile:mt-p10">
      {title}
    </h1>
  );
}
