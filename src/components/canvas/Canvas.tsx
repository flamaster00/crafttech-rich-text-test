import { RefObject, useState } from "react";
import { Layer, Stage } from "react-konva";
import { TShape, TTool } from "../../types/types";
import { KonvaEventObject } from "konva/lib/Node";
import Shape from "../shape/Shape";
import Konva from "konva";

interface CanvasProps {
  tool: TTool;
  stageRef: RefObject<Konva.Stage>;
}

const Canvas = ({ tool, stageRef }: CanvasProps) => {
  const [shapes, setShapes] = useState<TShape[]>([]);

  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const stage = e.target.getStage();
    if (!stage) return;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (!point) return;

    const newShape: TShape = {
      id: Date.now().toString(36),
      width: 100,
      height: 100,
      type: "rect",
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
      html: "",
      text: "",
    };

    setShapes((prev) => [...prev, newShape]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {shapes.map(shape => {
          return <Shape key={shape.id} shape={shape} tool={tool} />;
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
