import { HistoryItem, SpritesState } from "@customTypes/sprite.type";
import { actions } from "@data/actions";
import { useSelectedSprite } from "@hooks/useSelectedSprite";
import { addHistory, updateSprite } from "@reduxStore/features/spritePropSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Replay() {
  const history = useSelector(
    (state: { spriteProp: SpritesState }) => state.spriteProp.history,
  );

  //redux hooks
  const selectedSprite = useSelectedSprite();
  const dispatch = useDispatch();

  // Handle Replay Actions
  const handleBlockAction = (replayData: HistoryItem) => {
    const { content } = replayData;
    if (!selectedSprite || !content || !actions[content]) return;

    const updatedSprite = { ...selectedSprite };
    actions[content](updatedSprite);
    dispatch(updateSprite({ id: selectedSprite.id, updates: updatedSprite }));

    dispatch(addHistory(replayData as unknown as HistoryItem));
  };

  return (
    <div className="mt-4 flex flex-col items-center overflow-y-auto">
      {history.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: item.fill,
          }}
          className="mb-2 w-11/12 cursor-pointer rounded-sm py-2 text-center text-white"
          onClick={() => handleBlockAction(item)}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
