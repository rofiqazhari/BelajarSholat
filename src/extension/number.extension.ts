export {};

declare global {
  interface Number {
    formatIDR(): string;
  }
}

Object.defineProperty(Number.prototype, "formatIDR", {
  get: function formatIDR() {
    return Intl.NumberFormat("id-ID").format(this);
  },
});
