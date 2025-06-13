export type TDataTableItem<T> = {
  // columns
  index: number;
  // internalItem: T;
  isExpanded: boolean;
  isSelected: boolean;
  item: T;
  // toggleExpand
  // toggleSelect
};
