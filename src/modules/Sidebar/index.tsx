import { useState } from "react";
import Code from "./Code";
import Replay from "./Replay";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<"Code" | "Replay">("Code");

  return (
    <div className="w-64 flex-none overflow-y-auto overflow-x-hidden border-r border-secondaryBorder">
      <div className="mb-2 border-b border-secondaryBorder">
        <button
          className={`w-1/2 px-4 py-2 text-sm font-bold ${activeTab === "Code" ? "bg-accentBorder" : "bg-gray-100"}`}
          onClick={() => setActiveTab("Code")}
        >
          Code
        </button>
        <button
          className={`w-1/2 px-4 py-2 text-sm font-bold ${activeTab === "Replay" ? "bg-accentBorder" : "bg-gray-100"}`}
          onClick={() => setActiveTab("Replay")}
        >
          Replay
        </button>
      </div>
      {activeTab === "Code" ? <Code /> : <Replay />}
    </div>
  );
}
