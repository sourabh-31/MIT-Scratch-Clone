import MidArea from "modules/MidArea";
import PreviewArea from "modules/PreviewArea";
import ActionArea from "modules/ActionArea";
import Navbar from "@shared/Navbar";
import Sidebar from "@modules/Sidebar";

export default function App() {
  return (
    <div className="bg-blue-100">
      <Navbar />
      <div className="flex flex-row overflow-hidden">
        <div className="mr-2 flex h-[96vh] flex-1 flex-row overflow-hidden border-r border-t border-primaryBorder bg-white">
          <Sidebar />
          <MidArea />
        </div>
        <div className="ml-2 grid w-[28rem] grid-rows-[25rem_1fr] gap-4">
          <PreviewArea />
          <ActionArea />
        </div>
      </div>
    </div>
  );
}
