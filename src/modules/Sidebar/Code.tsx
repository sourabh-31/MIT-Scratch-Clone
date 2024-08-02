import { actions } from "@data/actions";
import { useDragAndDrop } from "@hooks/useDragAndDrop";
import { useSelectedSprite } from "@hooks/useSelectedSprite";
import { addHistory, updateSprite } from "@reduxStore/features/spritePropSlice";
import { useDispatch } from "react-redux";

export default function Code() {
  const { handleDragStart } = useDragAndDrop(() => {});
  const dispatch = useDispatch();
  const selectedSprite = useSelectedSprite();

  // Generate random ID
  function generateRandomId() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now.getHours().toString().padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `history-${dateStr}-${randomStr}`;
  }

  // Handle individual block item action
  const handleBlockAction = (content: string, bgColor: string) => {
    if (!selectedSprite || !actions[content]) return;

    const updatedSprite = { ...selectedSprite };
    actions[content](updatedSprite);
    dispatch(updateSprite({ id: selectedSprite.id, updates: updatedSprite }));

    // Create a history item
    const historyItem = {
      content: content,
      cornerRadius: 5,
      fill: bgColor,
      height: 40,
      id: generateRandomId(),
      isDragging: false,
      stroke: bgColor,
      strokeWidth: 0.5,
      textColor: "white",
      width: 230,
      x: 10,
      y: 10,
    };

    dispatch(addHistory(historyItem));
  };

  // Render code block
  const renderCodeBlock = (content: string, bgColorClass: string) => {
    const bgColor =
      bgColorClass.startsWith("bg-[") && bgColorClass.endsWith("]")
        ? bgColorClass.slice(4, -1)
        : bgColorClass;

    return (
      <div
        className={`my-2 flex cursor-grab flex-row flex-wrap rounded-sm ${bgColorClass} px-2 py-1 text-sm text-white`}
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: content,
            bgColor: bgColor,
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
        onClick={() => handleBlockAction(content, bgColor)}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="flex w-64 flex-none flex-col items-start overflow-y-auto border-r border-secondaryBorder px-4 py-2">
      <div className="font-bold">Events</div>
      {renderCodeBlock("when 🚩 clicked", "bg-[#eab308]")}

      <div className="font-bold">Motion</div>
      {renderCodeBlock("move 10 steps", "bg-[#3b82f6]")}
      {renderCodeBlock("move 10 steps back", "bg-[#3b82f6]")}
      {renderCodeBlock("turn left by 15°", "bg-[#3b82f6]")}
      {renderCodeBlock("turn right by 15°", "bg-[#3b82f6]")}
      {renderCodeBlock("go to x: 150 y: 150", "bg-[#3b82f6]")}
      {renderCodeBlock("invert 180°", "bg-[#3b82f6]")}
      {renderCodeBlock("rotate 360°", "bg-[#3b82f6]")}
      {renderCodeBlock("point in direction 90°", "bg-[#3b82f6]")}
      {renderCodeBlock("point to normal", "bg-[#3b82f6]")}
      {renderCodeBlock("change x by 20", "bg-[#3b82f6]")}
      {renderCodeBlock("set x to 100", "bg-[#3b82f6]")}
      {renderCodeBlock("change y by 20", "bg-[#3b82f6]")}
      {renderCodeBlock("set y to 100", "bg-[#3b82f6]")}

      <div className="font-bold">Looks</div>
      {renderCodeBlock("increase size by 10", "bg-[#9966ff]")}
      {renderCodeBlock("decrease size by 10", "bg-[#9966ff]")}
      {renderCodeBlock("set size to 150", "bg-[#9966ff]")}
      {renderCodeBlock("set size to normal", "bg-[#9966ff]")}
      {renderCodeBlock("set size to 50", "bg-[#9966ff]")}
      {renderCodeBlock("say Hello! for 2 seconds", "bg-[#9966ff]")}
      {renderCodeBlock("say Hello!", "bg-[#9966ff]")}
      {renderCodeBlock("show", "bg-[#9966ff]")}
      {renderCodeBlock("hide", "bg-[#9966ff]")}
    </div>
  );
}
