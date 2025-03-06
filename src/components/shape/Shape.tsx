import html2canvas from "html2canvas";
import Konva from "konva";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";
import { TShape, TTool } from "../../types/types";

interface ShapeProps {
  shape: TShape;
  tool: TTool;
}

const Shape = (props: ShapeProps) => {
  const { x, y, width, height, html, id, text } = props.shape;
  const { tool } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement | null>(null);
  const renderImage = useCallback(async () => {
    const htmltext = document.getElementById(`htmltext_${id}`);
    if (htmltext) {
      const innerhtml = htmltext.innerHTML;
      if (innerhtml) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: "rgba(0,0,0,0)",
        });
        const shape = new Konva.Image({
          x: 0,
          y: height / 2,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
        });
        if (groupRef.current) {
          groupRef.current.add(shape);
        }
        imageRef.current = shape;
      } else return;
    } else return;
  }, [height, id]);

  useEffect(() => {
    renderImage();
  }, [renderImage]);

  const handleClick = () => {
    if (tool === "shape") {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (imageRef.current) {
        if (isEditing) {
          imageRef.current.show();
        } else {
          imageRef.current.hide();
        }
      } else return;
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect stroke={"black"} width={width} height={height} />
        {isEditing && (
          <Html>
            <textarea value={value} onChange={handleInput} />
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={html} id={id} />
      </Html>
    </>
  );
};

export default Shape;
