import { Button } from "@krds-ui/core";

function App() {
  return (
    <>
      <h1 className="text-[42px] font-bold text-red-500">폰트 적용 테스트 합니다</h1>
      <Button children="버튼" size="small" variant="secondary" />
      <div className="p-p6 rounded-r3 shadow-s2 space-y-g4 bg-white">
        <h1 className="text-d-lg tracking-1 leading-base font-bold">디스플레이 라지 텍스트</h1>

        <p className="text-b-md font-reg leading-base text-gray-70">
          본문 텍스트입니다. 사용자 정의 폰트, 자간, 줄간격이 적용되어 있습니다.
        </p>

        <div className="gap-g4 flex items-center">
          <span className="w-icon4 h-icon4 bg-gray-20 rounded-r1 inline-block"></span>
          <span className="w-icon5 h-icon5 bg-gray-30 rounded-r2 inline-block"></span>
          <span className="w-icon6 h-icon6 bg-gray-40 rounded-r3 inline-block"></span>
        </div>
      </div>
      <div className="gap-g8 flex items-center">
        <span className="w-icon4 h-icon4 bg-primary-10 rounded-r6 inline-block"></span>
        <span className="w-icon5 h-icon5 bg-primary-20 rounded-r6 inline-block"></span>
        <span className="w-icon6 h-icon6 bg-primary-30 rounded-r6 inline-block"></span>
        <span className="w-icon6 h-icon6 bg-primary-40 rounded-r6 inline-block"></span>
      </div>
    </>
  );
}

export default App;
