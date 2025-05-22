import { Button } from "@krds-ui/core";

function App() {
  return (
    <>
      <h1 className="text-[42px] font-bold text-red-500">폰트 적용 테스트 합니다</h1>
      <Button children="버튼" size="small" variant="secondary" />
      <div className="space-y-g4 rounded-r3 bg-white p-p6 shadow-s2">
        <h1 className="text-d-lg font-bold leading-base tracking-1">디스플레이 라지 텍스트</h1>

        <p className="text-b-md font-reg leading-base text-gray-70">
          본문 텍스트입니다. 사용자 정의 폰트, 자간, 줄간격이 적용되어 있습니다.
        </p>

        <div className="flex items-center gap-g4">
          <span className="inline-block h-icon4 w-icon4 rounded-r1 bg-gray-20"></span>
          <span className="inline-block h-icon5 w-icon5 rounded-r2 bg-gray-30"></span>
          <span className="inline-block h-icon6 w-icon6 rounded-r3 bg-gray-40"></span>
        </div>
      </div>
      <div className="flex items-center gap-g8">
        <span className="inline-block h-icon4 w-icon4 rounded-r6 bg-primary-10"></span>
        <span className="inline-block h-icon5 w-icon5 rounded-r6 bg-primary-20"></span>
        <span className="inline-block h-icon6 w-icon6 rounded-r6 bg-primary-30"></span>
        <span className="inline-block h-icon6 w-icon6 rounded-r6 bg-primary-40"></span>
      </div>
    </>
  );
}

export default App;
