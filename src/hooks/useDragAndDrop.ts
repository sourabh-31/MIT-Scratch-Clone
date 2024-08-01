import { DraggedElementInfo } from "@customTypes/code.type";
import { useCallback } from "react";

export function useDragAndDrop(
  addBox: (
    info: DraggedElementInfo,
    position: { x: number; y: number },
  ) => void,
) {
  const handleDragStart = useCallback(
    (event: React.DragEvent, info: DraggedElementInfo) => {
      event.dataTransfer.setData("application/json", JSON.stringify(info));
      event.dataTransfer.effectAllowed = "copy";
    },
    [],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const midAreaBounds = event.currentTarget.getBoundingClientRect();
      const infoString = event.dataTransfer.getData("application/json");

      if (infoString) {
        const info: DraggedElementInfo = JSON.parse(infoString);
        const position = {
          x: event.clientX - midAreaBounds.left,
          y: event.clientY - midAreaBounds.top,
        };

        addBox(info, position);
      }
    },
    [addBox],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  return { handleDragStart, onDrop, onDragOver };
}
