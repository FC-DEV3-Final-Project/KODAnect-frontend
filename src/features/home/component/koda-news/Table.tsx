interface NewsData {
  boardCode: string;
  articleSeq: number;
  title: string;
  writeDate: string;
  new: boolean;
  fixed: boolean;
}

interface TableProps {
  items: NewsData[];
  label: string;
}

export default function Table({ items, label }: TableProps) {
  return (
    <table className="w-full text-b-sm">
      <caption className="sr-only">{label}</caption>
      <colgroup>
        <col />
        <col style={{ width: "110px" }} />
      </colgroup>
      <thead className="sr-only">
        <tr>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="mobile:flex mobile:flex-col mobile:gap-g1">
            <td
              className="max-w-[300px] mobile:max-w-[275px] overflow-hidden text-ellipsis whitespace-nowrap px-p2 py-p4 text-gray-90 mobile:pb-0"
              title={item.title} // 마우스 올리면 전체 제목 보이도록
            >
              {/* 상세 페이지 이동 필요하면 articleSeq, Link 사용하면 될것 같습니다 */}
              {item.title}
            </td>
            <td className="p-p2 text-right text-gray-40 mobile:text-left mobile:py-0">{item.writeDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
