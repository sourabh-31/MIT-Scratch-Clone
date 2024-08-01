export type Block = {
  id: string;
  content: JSX.Element;
};

export type BlockGroup = {
  title: string;
  blocks: Block[];
};

export type DraggedElementInfo = {
  content: string;
  bgColor: string;
  textColor: string;
  width: number;
  height: number;
};
