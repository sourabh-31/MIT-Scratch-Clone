import { SpritesState } from "@customTypes/sprite.type";
import { deleteSprite } from "@reduxStore/features/spritePropSlice";
import Icon from "@shared/Icon";
import { useDispatch, useSelector } from "react-redux";

interface SpriteViewType {
  id: string;
  name: string;
  component: React.ReactNode;
}

export default function SpriteView({ id, name, component }: SpriteViewType) {
  const selectedSpriteId = useSelector(
    (state: { spriteProp: SpritesState }) => state.spriteProp.selectedSprite,
  );

  const dispatch = useDispatch();

  const isSpriteSelected = selectedSpriteId === id;

  return (
    <div
      className={`relative h-fit w-20 cursor-pointer rounded-md bg-accentColor pl-[0.12rem] pr-[0.08rem] pt-[0.15rem] ${isSpriteSelected ? "border-[3px] border-accentBorder" : ""}`}
    >
      <div className="flex h-[2.8rem] items-center justify-center rounded-t-sm bg-white">
        <div className="w-fit scale-[30%]">{component}</div>
      </div>

      <div className="rounded-b-md bg-accentColor p-[0.15rem] text-center">
        <p className="overflow-hidden text-ellipsis break-words text-xs leading-tight text-white">
          {name || "Sprite"}
        </p>
      </div>

      <button
        className="absolute -right-2 -top-2 rounded-full border-2 border-accentBorder bg-accentColor p-1"
        onClick={() => dispatch(deleteSprite(id))}
      >
        <Icon name="trash-alt" size={14} className="text-white" />
      </button>
    </div>
  );
}
