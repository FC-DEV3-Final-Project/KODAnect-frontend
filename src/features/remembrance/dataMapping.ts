import type { LetterData, StoryData } from "@/shared/types/remembrance/LetterData.types";

export const heavenLetterMain = (item: LetterData) => {
  return {
    letterSeq: item.letterSeq,
    title: item.letterTitle,
    infoItems: [
      { label: "기증자", value: item.donorName },
      { label: "추모자", value: item.letterWriter },
    ],
    date: item.writeTime,
  };
};

export const heavenLetter = (item: LetterData) => {
  return {
    letterSeq: item.letterSeq,
    title: item.letterTitle,
    infoItems: [
      { label: "기증자", value: item.donorName },
      { label: "추모자", value: item.letterWriter },
    ],
    date: item.writeTime,
    views: item.readCount,
  };
};

export const recipientLetter = (item: LetterData) => ({
  letterSeq: item.letterSeq,
  title: item.letterTitle,
  infoItems: [{ label: "수혜자", value: item.letterWriter }],
  date: item.writeTime,
  views: item.readCount,
});

export const donorStory = (item: StoryData) => ({
  letterSeq: item.storySeq,
  title: item.storyTitle,
  infoItems: [{ label: "코디네이터", value: item.storyWriter }],
  date: item.writeTime,
  views: item.readCount,
});
