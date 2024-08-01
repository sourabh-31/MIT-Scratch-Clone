import { useDragAndDrop } from "@hooks/useDragAndDrop";

export default function CodeArea() {
  const { handleDragStart } = useDragAndDrop(() => {});

  return (
    <div className="flex w-64 flex-none flex-col items-start overflow-y-auto border-r border-secondaryBorder px-4 py-2">
      <div className="font-bold">Events</div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-yellow-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "when 🚩 clicked",
            bgColor: "#eab308",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"when 🚩 clicked"}
      </div>
      <div className="font-bold">Motion</div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "move 50 steps",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"move 50 steps"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "move 50 steps back",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"move 50 steps back"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "turn left by 15°",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"turn left by 15°"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "turn right by 15°",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"turn right by 15°"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "go to x: 150 y: 150",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"go to x: 150 y: 150"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "point in direction 0°",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"point in direction 0°"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "point in direction 90°",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"point in direction 90°"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "change x by 20",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"change x by 20"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "set x to 100",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"set x to 100"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "change y by 20",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"change y by 20"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-blue-500 px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "set y to 100",
            bgColor: "#3b82f6",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"set y to 100"}
      </div>
      <div className="font-bold">Looks</div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-[#9966ff] px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "set size to 150",
            bgColor: "#9966ff",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"set size to 150"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-[#9966ff] px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "set size to 50",
            bgColor: "#9966ff",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"set size to 50"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-[#9966ff] px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "say Hello! for 2 seconds",
            bgColor: "#9966ff",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"say Hello! for 2 seconds"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-[#9966ff] px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "say Hello!",
            bgColor: "#9966ff",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"say Hello!"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-[#9966ff] px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "show",
            bgColor: "#9966ff",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"show"}
      </div>
      <div
        className="my-2 flex cursor-grab flex-row flex-wrap rounded-sm bg-[#9966ff] px-2 py-1 text-sm text-white"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            content: "hide",
            bgColor: "#9966ff",
            textColor: "white",
            width: 250,
            height: 40,
          })
        }
      >
        {"hide"}
      </div>
    </div>
  );
}
