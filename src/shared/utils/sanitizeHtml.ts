export function sanitizeLetterContent(content: string): string {
  let sanitized = content;

  // <br /> 태그를 줄바꿈으로 변환
  sanitized = sanitized.replace(/<br\s*\/?>/gi, "\n");

  // HTML 엔티티를 실제 문자로 변환
  const htmlEntities: Record<string, string> = {
    "&nbsp;": " ", // non-breaking space → 일반 공백
    "&amp;": "&", // ampersand
    "&lt;": "<", // less than
    "&gt;": ">", // greater than
    "&quot;": '"', // quotation mark
    "&#39;": "'", // apostrophe
    "&apos;": "'", // apostrophe (alternative)
  };

  Object.entries(htmlEntities).forEach(([entity, char]) => {
    sanitized = sanitized.replace(new RegExp(entity, "g"), char);
  });

  // 기타 허용하지 않는 HTML 태그 제거 (보안상 안전)
  sanitized = sanitized.replace(/<(?!\/?(?:br|p|strong|em|b|i|u)\b)[^>]*>/gi, "");

  return sanitized.trim();
}
