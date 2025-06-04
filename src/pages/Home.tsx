import SearchInput from "@/shared/components/SearchInput";

export default function Home() {
  return (
    <div>
      Home
      <div className="w-[31.3rem]">
        <SearchInput
          onSubmit={(keyword: string) => {
            console.log(keyword);
            // 여기에 검색 결과 필터링 등 실행
          }}
          placeholder="검색어를 입력해 주세요"
        />
      </div>
    </div>
  );
}
