export type SpritesState = {
  sprites: SpritePropType[];
  selectedSprite: string;
  history: HistoryItem[];
};

export type SpritePropType = {
  id: string;
  name: string;
  positionX: number;
  positionY: number;
  size: number;
  direction: number;
  isVisible: boolean;
  say?: string;
  duration?: number;
};

export type SpritePositionType = {
  x: number;
  y: number;
};

export type HistoryItem = {
  content: string;
  cornerRadius: number;
  fill: string;
  height: number;
  id: string;
  isDragging: boolean;
  stroke: string;
  strokeWidth: number;
  textColor: string;
  width: number;
  x: number;
  y: number;
};
