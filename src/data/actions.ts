import { MAX_SIZE, MIN_SIZE } from "@constants/BoundaryValues";
import { SpritePropType } from "@customTypes/sprite.type";

const containerWidth = 447.5;
const containerHeight = 397.5;
const spriteWidth = 95;
const spriteHeight = 95;

export const actions: { [key: string]: (sprite: SpritePropType) => void } = {
  "move 10 steps": (sprite: SpritePropType) => {
    sprite.positionX = Math.min(
      sprite.positionX + 10,
      containerWidth - spriteWidth / 2,
    );
  },
  "move 10 steps back": (sprite: SpritePropType) => {
    sprite.positionX = Math.max(sprite.positionX - 10, -spriteWidth / 2);
  },
  "turn left by 15°": (sprite: SpritePropType) => {
    sprite.direction -= 15;
  },
  "turn right by 15°": (sprite: SpritePropType) => {
    sprite.direction += 15;
  },
  "go to x: 150 y: 150": (sprite: SpritePropType) => {
    sprite.positionX = Math.min(
      Math.max(150, -spriteWidth / 2),
      containerWidth - spriteWidth / 2,
    );
    sprite.positionY = Math.min(
      Math.max(150, -spriteHeight / 2),
      containerHeight - spriteHeight / 2,
    );
  },
  "change x by 20": (sprite: SpritePropType) => {
    sprite.positionX = Math.min(
      sprite.positionX + 20,
      containerWidth - spriteWidth / 2,
    );
  },
  "set x to 100": (sprite: SpritePropType) => {
    sprite.positionX = Math.min(
      Math.max(100, -spriteWidth / 2),
      containerWidth - spriteWidth / 2,
    );
  },
  "change y by 20": (sprite: SpritePropType) => {
    sprite.positionY = Math.min(
      sprite.positionY + 20,
      containerHeight - spriteHeight / 2,
    );
  },
  "set y to 100": (sprite: SpritePropType) => {
    sprite.positionY = Math.min(
      Math.max(100, -spriteHeight / 2),
      containerHeight - spriteHeight / 2,
    );
  },
  "invert 180°": (sprite: SpritePropType) => {
    sprite.direction += 180;
  },
  "rotate 360°": (sprite: SpritePropType) => {
    sprite.direction += 360;
  },
  "point in direction 90°": (sprite: SpritePropType) => {
    sprite.direction = 90;
  },
  "point to normal": (sprite: SpritePropType) => {
    sprite.direction = 1;
  },
  "increase size by 10": (sprite: SpritePropType) => {
    sprite.size = Math.min(MAX_SIZE, sprite.size + 10);
  },
  "decrease size by 10": (sprite: SpritePropType) => {
    sprite.size = Math.max(MIN_SIZE, sprite.size - 10);
  },
  "set size to 150": (sprite: SpritePropType) => {
    sprite.size = 150;
  },
  "set size to normal": (sprite: SpritePropType) => {
    sprite.size = 100;
  },
  "set size to 50": (sprite: SpritePropType) => {
    sprite.size = 50;
  },
  "say Hello! for 2 seconds": (sprite: SpritePropType) => {
    sprite.say = "Hello";
    sprite.duration = 2000;
  },
  "say Hello!": (sprite: SpritePropType) => {
    sprite.say = "Hello";
    sprite.duration = 0;
  },
  show: (sprite: SpritePropType) => {
    sprite.isVisible = true;
  },
  hide: (sprite: SpritePropType) => {
    sprite.isVisible = false;
  },
};
