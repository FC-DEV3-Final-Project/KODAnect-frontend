import { useParams } from "react-router-dom";
import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { stories } from "@/features/story-view/mock-data";
import { TopArea } from "@/shared/components/TopArea";
import { getStoryInfoItems } from "@/features/story-view/utils/getStoryInfoItems";

function StoryView() {
  const { id } = useParams<{ id: string }>();
  const story = stories.find((s) => s.storySeq === Number(id));

  if (!story) {
    return <p className="mt-10 text-center">스토리를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description
          startBefore="한국장기조직기증원 장기구득 코디네이터가 함께 한 영원히 기억되는 기증자의 숭고한 나눔의 순간과 아름다운 이야기를 적는 공간입니다."
          checkItems={[
            "KODA 장기구득 코디네이터들의 공간입니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하 여 주시기 바랍니다.",
          ]}
        />
        <LetterContent
          title={story.title}
          content={story.storyContent}
          infoItems={getStoryInfoItems(story)}
          onGoList={() => console.log("목록 페이지로 이동")}
          onEdit={() => console.log("편지 수정")}
          onDelete={() => console.log("편지 삭제")}
          mobileWidth="7rem"
        />
        <CommentArea />
      </div>
    </div>
  );
}

export default StoryView;
