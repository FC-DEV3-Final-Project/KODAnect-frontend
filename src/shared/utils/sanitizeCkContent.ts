export function sanitizeCkContent(html: string): string {
  return html
    .replace(/contenteditable=["']?true["']?/gi, "")
    .replace(/data-cke-[^=]+="[^"]*"/gi, "")
    .replace(/class="[^"]*cke[^"]*"/gi, "")
    .replace(/<body[^>]*>|<\/body>/gi, "") // body 제거
    .replace(/ [^ =]+=["'][^"']*["']/g, (match) => {
      return /^[a-zA-Z_:][-a-zA-Z0-9_:.]*=/.test(match) ? match : "";
    });
}
