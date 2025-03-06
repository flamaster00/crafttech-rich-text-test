import { forwardRef } from "react";
import { TShape } from "../../types/types";

interface HtmlTextProps {
  html: TShape['html'],
  id: TShape['id'], 
}

const HtmlText = forwardRef<HTMLDivElement, HtmlTextProps>(({ html, id }, ref) => {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: "fixed",
        overflow: "hidden",
        left: "100000px",
        top: "100000px",
      }}
      ref={ref}
    ></div>
  );
});

export default HtmlText;
