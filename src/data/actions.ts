import { SpritePropType } from "@customTypes/sprite.type";

export const actions: { [key: string]: (sprite: SpritePropType) => void } = {
  "move 50 steps": (sprite: SpritePropType) => {
    sprite.positionX += 50;
  },
  "move 50 steps back": (sprite: SpritePropType) => {
    sprite.positionX -= 50;
  },
  "turn left by 15°": (sprite: SpritePropType) => {
    sprite.direction -= 15;
  },
  "turn right by 15°": (sprite: SpritePropType) => {
    sprite.direction += 15;
  },
  "go to x: 150 y: 150": (sprite: SpritePropType) => {
    sprite.positionX = 150;
    sprite.positionY = 150;
  },
  "change x by 20": (sprite: SpritePropType) => {
    sprite.positionX += 20;
  },
  "set x to 100": (sprite: SpritePropType) => {
    sprite.positionX = 100;
  },
  "change y by 20": (sprite: SpritePropType) => {
    sprite.positionY += 20;
  },
  "set y to 100": (sprite: SpritePropType) => {
    sprite.positionY = 100;
  },
  "point in direction 0°": (sprite: SpritePropType) => {
    sprite.direction = 0;
  },
  "point in direction 90°": (sprite: SpritePropType) => {
    sprite.direction = 90;
  },
  "rotate 360°": (sprite: SpritePropType) => {
    sprite.direction += 360;
  },
  "set size to 150": (sprite: SpritePropType) => {
    sprite.size = 150;
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
