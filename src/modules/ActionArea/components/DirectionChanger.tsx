import CircularSlider from "@fseehawer/react-circular-slider";
import { useSelectedSprite } from "@hooks/useSelectedSprite";
import { updateSprite } from "@reduxStore/features/spritePropSlice";
import { useDispatch } from "react-redux";

export default function DirectionChanger() {
  const selectedSprite = useSelectedSprite();
  const direction = selectedSprite?.direction;

  const dispatch = useDispatch();

  return (
    <div className="font-medium">
      <CircularSlider
        label="Direction"
        progressSize={4}
        trackSize={4}
        width={100}
        knobColor="#8f76ff"
        progressColorFrom="#855cd6"
        progressColorTo="#855cd6"
        trackColor="#dad3fa"
        valueFontSize="1.2rem"
        labelColor="#333"
        labelFontSize="0.9rem"
        knobSize={24}
        verticalOffset="0.2rem"
        appendToValue="°"
        dataIndex={direction}
        onChange={(value: number) => {
          dispatch(
            updateSprite({
              id: selectedSprite?.id,
              updates: { direction: value ?? direction },
            }),
          );
        }}
      />
    </div>
  );
}
