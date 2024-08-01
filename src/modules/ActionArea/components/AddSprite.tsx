import Icon from "@shared/Icon";
import { useDispatch, useSelector } from "react-redux";
import spriteData from "@data/spriteData.json";
import { addSprite } from "@reduxStore/features/spritePropSlice";
import { SpritesState } from "@customTypes/sprite.type";

export default function AddSprite() {
  const dispatch = useDispatch();
  const selectedSpriteId = useSelector(
    (state: { spriteProp: SpritesState }) => state.spriteProp.selectedSprite,
  );

  // Check temporarily as there is only one Sprite
  const isSpritePresent = spriteData.some(
    (sprite) => sprite.id === selectedSpriteId,
  );

  const addIndividualSprite = (id: string) => {
    const addedSprite = spriteData.filter((sprite) => sprite.id === id)[0];
    dispatch(addSprite(addedSprite));
  };

  return (
    <div>
      {!isSpritePresent && (
        <div>
          {spriteData.map((sprite) => (
            <button
              className="m-1 rounded-full border-4 border-accentBorder bg-accentColor p-3"
              title="Add Sprite"
              key={sprite.id}
              onClick={() => addIndividualSprite(sprite.id)}
            >
              <Icon
                name={sprite.name.toLowerCase()}
                size={20}
                className="text-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
