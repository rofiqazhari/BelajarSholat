export {};

declare global {
  interface Array<T> {
    isEmpty: () => boolean;
    isNotEmpty: () => boolean;
  }
}

Array.prototype.isEmpty = function () {
  return this.length <= 0;
};

Array.prototype.isNotEmpty = function () {
  return this.length >= 1;
};
