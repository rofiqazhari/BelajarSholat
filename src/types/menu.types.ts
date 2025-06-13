export type TContextMenu<T> = {
  show: boolean;
  location: [number, number];
  data?: T;
};

export type TMenu = {
  title: string;
  value: number;
  disabled?: boolean;
};
