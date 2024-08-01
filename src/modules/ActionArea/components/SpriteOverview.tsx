import CatSprite from "@assets/sprite/CatSprite";
import SpriteView from "./SpriteView";
import AddSprite from "./AddSprite";
import { useSelector } from "react-redux";
import { SpritePropType, SpritesState } from "@customTypes/sprite.type";
import React from "react";

const spriteComponents: Record<string, React.ComponentType> = {
  "SCR-SPR-CAT": CatSprite,
  // Add other identifier components if the respective data is added in the .json file
};

export default function SpriteOverview() {
  const spriteData = useSelector(
    (state: { spriteProp: SpritesState }) => state.spriteProp.sprites,
  );

  const getSpriteComponent = (sprite: SpritePropType) => {
    const Component = spriteComponents[sprite.id];
    return <Component />;
  };

  return (
    <div className="relative h-full py-2">
      <div className="grid grid-cols-5 justify-items-center gap-y-4">
        {spriteData.map((sprite) => (
          <SpriteView
            id={sprite.id}
            name={sprite.name}
            component={getSpriteComponent(sprite)}
            key={sprite.id}
          />
        ))}
      </div>

      <div className="absolute bottom-36 right-2">
        <AddSprite />
      </div>
    </div>
  );
}
