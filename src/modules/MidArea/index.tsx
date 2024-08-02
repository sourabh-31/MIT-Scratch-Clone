import { DraggedElementInfo } from "@customTypes/code.type";
import { HistoryItem } from "@customTypes/sprite.type";
import { actions } from "@data/actions";
import { useDragAndDrop } from "@hooks/useDragAndDrop";
import { useSelectedSprite } from "@hooks/useSelectedSprite";
import { addHistory, updateSprite } from "@reduxStore/features/spritePropSlice";
import Icon from "@shared/Icon";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import { useDispatch } from "react-redux";

interface Box {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  isDragging: boolean;
  cornerRadius: number;
  content?: string;
  textColor?: string;
  children: Box[];
}

const INITIAL_STATE: Box[] = [
  {
    children: [
      {
        children: [],
        content: "when 🚩 clicked",
        cornerRadius: 5,
        fill: "#eab308",
        height: 40,
        id: "code-1722586082873",
        isDragging: false,
        stroke: "#eab308",
        strokeWidth: 0.5,
        textColor: "white",
        width: 230,
        x: 10,
        y: 10,
      },
    ],
    cornerRadius: 5,
    fill: "transparent",
    height: 150,
    id: "box-1722584626978",
    isDragging: false,
    stroke: "#855cd6",
    strokeWidth: 0.5,
    width: 250,
    x: 213.5,
    y: 218.5,
  },
];

const INITIAL_HISTORY_STATE: Box[] = [
  {
    children: [],
    content: "when 🚩 clicked",
    cornerRadius: 5,
    fill: "#eab308",
    height: 40,
    id: "code-1722586082873",
    isDragging: false,
    stroke: "#eab308",
    strokeWidth: 0.5,
    textColor: "white",
    width: 230,
    x: 10,
    y: 10,
  },
];

const PADDING = 10;

export default function MidArea() {
  // Default states
  const [boxes, setBoxes] = useState<Box[]>(INITIAL_STATE);
  const [history, setHistory] = useState<Box[]>(INITIAL_HISTORY_STATE);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isOuterBox, setIsOuterBox] = useState<boolean>(true);
  const [isOverTrash, setIsOverTrash] = useState<boolean>(false);
  const [outerBoxId, setOuterBoxId] = useState<string | null>(
    "box-1722584626978",
  );

  // Redux states
  const selectedSprite = useSelectedSprite();
  const dispatch = useDispatch();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLButtonElement>(null);

  // Check is flag present to handle button click event conditionally
  const isFlagPresent = history.some(
    (codeData) => codeData.content === "when 🚩 clicked",
  );

  // Canvas settings
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dispatch group of actions when clicked on group
  const handleDispatch = () => {
    if (!selectedSprite) return;

    const updatedSprite = { ...selectedSprite };

    history.forEach((block) => {
      const { content } = block;
      if (content && actions[content]) {
        actions[content](updatedSprite);
      }
    });

    dispatch(updateSprite({ id: selectedSprite.id, updates: updatedSprite }));
    history.forEach((item) => {
      dispatch(addHistory(item as unknown as HistoryItem));
    });
  };

  // Dispatch individual block action if not present in group
  const handleBlockAction = (content: string | undefined, id: string) => {
    if (!selectedSprite || !content || !actions[content]) return;

    const updatedSprite = { ...selectedSprite };
    actions[content](updatedSprite);
    dispatch(updateSprite({ id: selectedSprite.id, updates: updatedSprite }));

    const clickedBlock = boxes.filter((box) => box.id === id)[0];
    dispatch(addHistory(clickedBlock as unknown as HistoryItem));
  };

  // Handle drag action
  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    setBoxes(
      boxes.map((box) => ({
        ...box,
        isDragging: box.id === id,
      })),
    );
  };

  // Handle drag move action
  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (trashRef.current) {
      const trashBox = trashRef.current.getBoundingClientRect();
      const { clientX, clientY } = e.evt;

      if (
        clientX >= trashBox.left &&
        clientX <= trashBox.right &&
        clientY >= trashBox.top &&
        clientY <= trashBox.bottom
      ) {
        setIsOverTrash(true);
      } else {
        setIsOverTrash(false);
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    const box = e.target;
    const newX = box.x();
    const newY = box.y();

    if (isOverTrash) {
      setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
      setHistory((prevHistory) => prevHistory.filter((item) => item.id === id));
      if (id === outerBoxId) {
        setIsOuterBox(false);
        setOuterBoxId(null);
      }
      setIsOverTrash(false);
      return;
    }

    setBoxes((prevBoxes) => {
      let updatedBoxes = [...prevBoxes];
      const draggedBox = updatedBoxes.find((b) => b.id === id);

      if (!draggedBox) return prevBoxes;

      const parentBox = findNearestBox({ x: newX, y: newY });

      if (parentBox && parentBox.id !== id) {
        if (
          draggedBox.content === "when 🚩 clicked" &&
          parentBox.children.some(
            (child) => child.content === "when 🚩 clicked",
          )
        ) {
          return updatedBoxes;
        }

        const newChild = {
          ...draggedBox,
          x: PADDING,
          y:
            parentBox.children.reduce(
              (maxY, child) => Math.max(maxY, child.y + child.height),
              0,
            ) + PADDING,
          width: parentBox.width - 2 * PADDING,
        };

        updatedBoxes = updatedBoxes.filter((b) => b.id !== id);

        updatedBoxes = updatedBoxes.map((b) => {
          if (b.id === parentBox.id) {
            return {
              ...b,
              children: [...b.children, newChild],
              height: Math.max(
                b.height,
                b.children.reduce(
                  (sum, child) => sum + child.height + PADDING,
                  0,
                ) +
                  newChild.height +
                  PADDING * 2,
              ),
            };
          }
          return b;
        });

        // Add to history when dragged into a box
        setHistory((prevHistory) => [...prevHistory, newChild]);
      } else {
        updatedBoxes = updatedBoxes.map((b) =>
          b.id === id ? { ...b, x: newX, y: newY } : b,
        );

        // Remove from history when dragged out of a box
        setHistory((prevHistory) =>
          prevHistory.filter((item) => item.id !== id),
        );
      }

      return updatedBoxes;
    });
  };

  // Handle add outer group box
  const addBox = () => {
    setIsOuterBox(true);
    const newBox: Box = {
      id: `box-${Date.now()}`,
      x: dimensions.width / 2 - 125,
      y: dimensions.height / 2 - 75,
      width: 250,
      height: 150,
      fill: "transparent",
      stroke: "#855cd6",
      strokeWidth: 0.5,
      isDragging: false,
      cornerRadius: 5,
      children: [],
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    setOuterBoxId(newBox.id);
  };

  // Handle block when hover over a group box
  const findNearestBox = (position: { x: number; y: number }): Box | null => {
    for (const box of boxes) {
      if (
        position.x >= box.x &&
        position.x <= box.x + box.width &&
        position.y >= box.y &&
        position.y <= box.y + box.height
      ) {
        return box;
      }
    }
    return null;
  };

  // Handle code block when a block is dragged into group box
  const addCodeBlock = (
    info: DraggedElementInfo,
    position: { x: number; y: number },
  ) => {
    const parentBox = findNearestBox(position);
    if (
      info.content === "when 🚩 clicked" &&
      (parentBox
        ? parentBox.children.some(
            (child) => child.content === "when 🚩 clicked",
          )
        : boxes.some((box) => box.content === "when 🚩 clicked"))
    ) {
      return;
    }

    const newBox: Box = {
      id: `code-${Date.now()}`,
      x: parentBox ? PADDING : position.x,
      y: parentBox ? PADDING : position.y,
      width: parentBox ? parentBox.width - 2 * PADDING : info.width || 200,
      height: info.height,
      fill: info.bgColor,
      stroke: info.bgColor,
      strokeWidth: 0.5,
      isDragging: false,
      cornerRadius: 5,
      content: info.content,
      textColor: info.textColor,
      children: [],
    };

    if (parentBox) {
      setBoxes((prevBoxes) =>
        prevBoxes.map((box) => {
          if (box.id === parentBox.id) {
            const newChildren =
              newBox.content === "when 🚩 clicked"
                ? [newBox, ...box.children]
                : [...box.children, newBox];

            const totalChildrenHeight = newChildren.reduce(
              (sum, child) => sum + child.height + PADDING,
              PADDING,
            );

            const updatedChildren = newChildren.map((child, index) => ({
              ...child,
              y:
                index === 0
                  ? PADDING
                  : newChildren
                      .slice(0, index)
                      .reduce(
                        (acc, prevChild) => acc + prevChild.height + PADDING,
                        PADDING,
                      ),
            }));

            return {
              ...box,
              height: Math.max(box.height, totalChildrenHeight + PADDING),
              children: updatedChildren,
            };
          }
          return box;
        }),
      );
      setHistory((prevHistory) => [...prevHistory, newBox]);
    } else {
      setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    }
  };

  // Use Drag and Drop
  const { onDrop, onDragOver } = useDragAndDrop(addCodeBlock);

  // Render boxes on the canvas
  const renderBox = (box: Box) => (
    <Group
      key={box.id}
      id={box.id}
      x={box.x}
      y={box.y}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.cancelBubble = true;
        if (box.children.length > 0) {
          handleDispatch();
        } else if (box.content) {
          handleBlockAction(box.content, box.id);
        }
      }}
    >
      <Rect
        width={box.width}
        height={box.height}
        fill={box.fill}
        stroke={box.stroke}
        cornerRadius={box.cornerRadius}
        strokeWidth={box.strokeWidth}
      />
      {box.content && !box.children.length && (
        <Group
          onClick={(e) => {
            e.cancelBubble = true;
            handleBlockAction(box.content, box.id);
          }}
        >
          <Text
            x={PADDING}
            y={PADDING}
            text={box.content}
            fill={box.textColor || "white"}
            fontSize={14}
            align="left"
            width={box.width - 2 * PADDING}
            wrap="word"
          />
        </Group>
      )}
      {box.children.map((child, index) => {
        const yPosition = box.children
          .slice(0, index)
          .reduce(
            (sum, prevChild) => sum + prevChild.height + PADDING,
            PADDING,
          );
        return (
          <Group key={child.id} x={child.x} y={yPosition}>
            <Rect
              width={child.width}
              height={child.height}
              fill={child.fill}
              stroke={child.stroke}
              cornerRadius={child.cornerRadius}
              strokeWidth={child.strokeWidth}
            />
            {child.content && (
              <Text
                x={PADDING}
                y={PADDING}
                text={child.content}
                fill={child.textColor || "white"}
                fontSize={14}
                align="left"
                width={child.width - 2 * PADDING}
                wrap="word"
              />
            )}
          </Group>
        );
      })}
    </Group>
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full flex-1 overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {!isOuterBox && (
        <button
          onClick={addBox}
          className="absolute bottom-10 right-8 z-10 rounded-full border-4 border-accentBorder bg-accentColor p-2"
          title="Add group"
        >
          <Icon name="plus" size={24} className="text-white" />
        </button>
      )}

      <button
        ref={trashRef}
        className={`absolute bottom-10 left-8 z-10 rounded-full border-4 border-accentBorder ${
          isOverTrash ? "bg-red-700" : "bg-red-500"
        } p-2`}
        title="Remove group"
      >
        <Icon name="trash-alt" size={24} className="text-white" />
      </button>

      <Stage
        width={dimensions.width}
        height={dimensions.height}
        className="bg-[#f3f2f2]"
      >
        <Layer>{boxes.map(renderBox)}</Layer>
      </Stage>

      <div className="absolute right-4 top-2 flex gap-4">
        <button
          className="rounded-sm bg-accentColor px-3 py-2"
          title="Reset Default"
          onClick={() =>
            dispatch(
              updateSprite({
                id: selectedSprite?.id,
                updates: {
                  positionX: 80,
                  positionY: 200,
                  size: 100,
                  direction: 1,
                  isVisible: true,
                  say: "",
                  duration: 0,
                },
              }),
            )
          }
        >
          <Icon name="undo" size={15} className="text-white" />
        </button>

        <button
          className="rounded-sm bg-accentColor p-2"
          onClick={() => isFlagPresent && handleDispatch()}
          title="Play code"
        >
          🚩
        </button>
      </div>
    </div>
  );
}
