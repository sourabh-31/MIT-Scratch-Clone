import { useState, useRef, MouseEvent, useEffect } from "react";
import CatSprite from "@assets/sprite/CatSprite";
import { useDispatch } from "react-redux";
import {
  setPositionX,
  setPositionY,
  updateSprite,
} from "@reduxStore/features/spritePropSlice";
import { SpritePositionType } from "@customTypes/sprite.type";
import { useSelectedSprite } from "@hooks/useSelectedSprite";

export default function PreviewArea() {
  //Default states
  const [initialPosition, setInitialPosition] =
    useState<SpritePositionType | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Redux states
  const dispatch = useDispatch();
  const selectedSprite = useSelectedSprite();

  //Refs
  const dragRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle sprite speech duration
  useEffect(() => {
    if (selectedSprite) {
      if (selectedSprite.duration) {
        const timer = setTimeout(() => {
          dispatch(
            updateSprite({
              id: selectedSprite.id,
              updates: { say: "", duration: 0 },
            }),
          );
        }, selectedSprite.duration);

        // Clean up function to remove the timeout
        return () => clearTimeout(timer);
      }
    }
  }, [selectedSprite, dispatch]);

  // Handle sprite Dragging
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      setInitialPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle sprite move on the preview area
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (isDragging && initialPosition && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dragRect = dragRef.current?.getBoundingClientRect();

      const newX = e.clientX - containerRect.left - initialPosition.x;
      const newY = e.clientY - containerRect.top - initialPosition.y;

      const maxX = containerRect.width - (dragRect?.width || 0);
      const maxY = containerRect.height - (dragRect?.height || 0);

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      const roundedX = Math.round(boundedX);
      const roundedY = Math.round(boundedY);

      dispatch(setPositionX({ id: selectedSprite?.id, positionX: roundedX }));
      dispatch(setPositionY({ id: selectedSprite?.id, positionY: roundedY }));
    }
  };

  //
  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  // Handle sprite size and and direction
  const getTransformStyle = () => {
    const scale = selectedSprite?.size ? selectedSprite.size / 100 : 1;
    const rotation = selectedSprite?.direction;

    return {
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: rotation !== 0 ? "center" : "top left",
    };
  };

  // Handle speech cloud
  const SpeechCloud = ({ text }: { text: string }) => (
    <div
      style={{
        position: "absolute",
        top: "-60px",
        left: "70%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: "20px",
        padding: "10px",
        maxWidth: "150px",
        textAlign: "center",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      {text}
      <div
        style={{
          position: "absolute",
          bottom: "-11px",
          left: "50%",
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          border: "3px solid black",
          borderTop: "none",
          borderLeft: "none",
          transform: "translateX(-50%) rotate(45deg)",
          scale: "60%",
        }}
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-bl-xl border-b border-l border-t border-primaryBorder bg-white"
      style={{ overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={dragRef}
        style={{
          position: "absolute",
          left: `${selectedSprite?.positionX}px`,
          top: `${selectedSprite?.positionY}px`,
          cursor: "move",
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={getTransformStyle()}>
          {selectedSprite && selectedSprite.isVisible ? (
            <>
              {selectedSprite.say && <SpeechCloud text={selectedSprite.say} />}

              <CatSprite />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
