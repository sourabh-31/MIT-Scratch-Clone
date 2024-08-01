import { SpritesState } from "@customTypes/sprite.type";
import { useSelector } from "react-redux";

export const useSelectedSprite = () => {
  const spriteData = useSelector(
    (state: { spriteProp: SpritesState }) => state.spriteProp.sprites,
  );

  const selectedSpriteId = useSelector(
    (state: { spriteProp: SpritesState }) => state.spriteProp.selectedSprite,
  );

  const selectedSprite = spriteData.find(
    (sprite) => sprite.id === selectedSpriteId,
  );

  return selectedSprite;
};
