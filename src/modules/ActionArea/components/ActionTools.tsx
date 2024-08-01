import { useSelectedSprite } from "@hooks/useSelectedSprite";
import { updateSprite } from "@reduxStore/features/spritePropSlice";
import LabelledInput from "@shared/LabelledInput";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import DirectionChanger from "./DirectionChanger";
import {
  MAX_SIZE,
  MAX_X,
  MAX_Y,
  MIN_SIZE,
  MIN_X,
  MIN_Y,
} from "@constants/BoundaryValues";

export default function ActionTools() {
  const selectedSprite = useSelectedSprite();
  const dispatch = useDispatch();
  const [showDirectionSlider, setShowDirectionSlider] =
    useState<boolean>(false);
  const [localState, setLocalState] = useState({
    name: "",
    positionX: "",
    positionY: "",
    size: "",
    direction: "",
    isVisible: false,
  });
  const directionRef = useRef<HTMLDivElement>(null);

  // Set sprite data locally
  useEffect(() => {
    if (selectedSprite) {
      setLocalState({
        name: selectedSprite.name,
        positionX: selectedSprite.positionX.toString(),
        positionY: selectedSprite.positionY.toString(),
        size: selectedSprite.size.toString(),
        direction: selectedSprite?.direction?.toString(),
        isVisible: selectedSprite.isVisible,
      });
    }

    return () =>
      setLocalState({
        name: "",
        positionX: "",
        positionY: "",
        size: "",
        direction: "",
        isVisible: false,
      });
  }, [selectedSprite]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setLocalState((prev) => ({ ...prev, [field]: value }));
  };

  // Update sprite on input blur
  const handleInputBlur = (field: string, value: string | boolean) => {
    if (selectedSprite) {
      let updatedValue: string | number | boolean = value;

      if (field !== "name" && typeof updatedValue === "string") {
        updatedValue = Number(updatedValue);
      }

      if (field === "positionX") {
        updatedValue = Math.max(MIN_X, Math.min(MAX_X, updatedValue as number));
      } else if (field === "positionY") {
        updatedValue = Math.max(MIN_Y, Math.min(MAX_Y, updatedValue as number));
      } else if (field === "size") {
        updatedValue = Math.max(
          MIN_SIZE,
          Math.min(MAX_SIZE, updatedValue as number),
        );
      }

      dispatch(
        updateSprite({
          id: selectedSprite.id,
          updates: { [field]: updatedValue },
        }),
      );
    }
  };

  // Hide direction component when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        directionRef.current &&
        !directionRef.current.contains(event.target as Node)
      ) {
        setShowDirectionSlider(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="rounded-tl-xl border-b border-secondaryBorder bg-white px-4 py-2">
      <div className="flex justify-between py-2">
        <LabelledInput
          label="Sprite"
          id="spriteName"
          type="text"
          placeholder="Name"
          className="w-32"
          value={localState.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          onBlur={(e) => handleInputBlur("name", e.target.value)}
        />
        <LabelledInput
          label="x"
          id="positionX"
          placeholder="x"
          className="w-16"
          type="text"
          value={localState.positionX}
          onChange={(e) => handleInputChange("positionX", e.target.value)}
          onBlur={(e) => handleInputBlur("positionX", e.target.value)}
        />
        <LabelledInput
          label="y"
          id="positionY"
          placeholder="y"
          className="w-16"
          type="text"
          value={localState.positionY}
          onChange={(e) => handleInputChange("positionY", e.target.value)}
          onBlur={(e) => handleInputBlur("positionY", e.target.value)}
        />
      </div>

      <div className="flex justify-between py-2">
        {/* Checkbox */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="spriteShow"
            className="text-xs font-bold text-primaryText"
          >
            Visible
          </label>
          <input
            id="spriteShow"
            name="spriteShow"
            type="checkbox"
            className="mt-[2px] cursor-pointer"
            checked={localState.isVisible}
            onChange={(e) => {
              handleInputChange("isVisible", e.target.checked);
              handleInputBlur("isVisible", e.target.checked);
            }}
          />
        </div>

        <LabelledInput
          label="Size"
          id="spriteSize"
          className="w-16"
          type="text"
          value={localState.size}
          onChange={(e) => handleInputChange("size", e.target.value)}
          onBlur={(e) => handleInputBlur("size", e.target.value)}
        />
        <div className="relative">
          <LabelledInput
            label="Direction"
            id="spriteDirection"
            className="w-16"
            type="text"
            value={localState.direction}
            onChange={(e) => handleInputChange("direction", e.target.value)}
            onBlur={(e) => handleInputBlur("direction", e.target.value)}
            onFocus={() => setShowDirectionSlider(true)}
          />
          {showDirectionSlider && (
            <div
              className="absolute -top-[9.5rem] rounded-lg border border-accentBorder bg-white p-4 shadow-md"
              ref={directionRef}
            >
              <DirectionChanger />
              <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accentBorder" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
