import ActionTools from "./components/ActionTools";
import SpriteOverview from "./components/SpriteOverview";

export default function ActionArea() {
  return (
    <div className="rounded-tl-xl border-l border-t border-primaryBorder">
      <ActionTools />
      <SpriteOverview />
    </div>
  );
}
