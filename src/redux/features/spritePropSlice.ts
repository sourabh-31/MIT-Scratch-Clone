import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryItem, SpritePropType, SpritesState } from "types/sprite.type";

const initialState: SpritesState = {
  sprites: [
    {
      id: "SCR-SPR-CAT",
      name: "Cat",
      positionX: 80,
      positionY: 200,
      size: 100,
      direction: 1,
      isVisible: true,
      say: "",
      duration: 0,
    },
  ],
  selectedSprite: "SCR-SPR-CAT",
  history: [],
};

const spritePropSlice = createSlice({
  name: "spriteProp",
  initialState,
  reducers: {
    addSprite: (state, action: PayloadAction<SpritePropType>) => {
      state.sprites.push(action.payload);
      state.selectedSprite = action.payload.id;
    },
    deleteSprite: (state, action: PayloadAction<string>) => {
      state.selectedSprite === action.payload
        ? (state.selectedSprite = "")
        : null;

      state.sprites = state.sprites.filter(
        (sprite) => sprite.id !== action.payload,
      );
    },
    updateSprite: (
      state,
      action: PayloadAction<{ id?: string; updates: Partial<SpritePropType> }>,
    ) => {
      const index = state.sprites.findIndex(
        (sprite) => sprite.id === action.payload.id,
      );
      if (index !== -1) {
        state.sprites[index] = {
          ...state.sprites[index],
          ...action.payload.updates,
        };
      }
    },
    setPositionX: (
      state,
      action: PayloadAction<{ id?: string; positionX: number }>,
    ) => {
      const sprite = state.sprites.find(
        (sprite) => sprite.id === action.payload.id,
      );
      if (sprite) {
        sprite.positionX = action.payload.positionX;
      }
    },
    setPositionY: (
      state,
      action: PayloadAction<{ id?: string; positionY: number }>,
    ) => {
      const sprite = state.sprites.find(
        (sprite) => sprite.id === action.payload.id,
      );
      if (sprite) {
        sprite.positionY = action.payload.positionY;
      }
    },

    setSpeech: (
      state,
      action: PayloadAction<{ id: string; say: string; duration: number }>,
    ) => {
      const sprite = state.sprites.find(
        (sprite) => sprite.id === action.payload.id,
      );
      if (sprite) {
        sprite.say = action.payload.say;
        sprite.duration = action.payload.duration;
      }
    },

    clearSpeech: (state, action: PayloadAction<string>) => {
      const sprite = state.sprites.find(
        (sprite) => sprite.id === action.payload,
      );
      if (sprite) {
        sprite.say = "";
        sprite.duration = 0;
      }
    },
    addHistory: (state, action: PayloadAction<HistoryItem>) => {
      state.history.push(action.payload);
    },

    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  addSprite,
  deleteSprite,
  updateSprite,
  setPositionX,
  setPositionY,
  addHistory,
  clearHistory,
} = spritePropSlice.actions;

export default spritePropSlice.reducer;
