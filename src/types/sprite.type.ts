export type SpritesState = {
  sprites: SpritePropType[];
  selectedSprite: string;
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
