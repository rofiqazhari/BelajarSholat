export {};

declare global {
  interface String {
    isNullOrEmpty: boolean;
    isNotEmpty: boolean;
    toNumberOnly(): number;
    isIPV4(): boolean;
    isIndonesiaPhoneNumber(): boolean;
    toNumberOnlyString(): string;
    toDate(): Date;
  }
}

Object.defineProperty(String.prototype, "isNullOrEmpty", {
  get() {
    return this == null || this == "";
  },
});

Object.defineProperty(String.prototype, "isNotEmpty", {
  get() {
    return this != "";
  },
});

String.prototype.isIPV4 = function () {
  const pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return this.match(pattern) != null;
};

String.prototype.isIndonesiaPhoneNumber = function () {
  const regex = /^(\+62|0)\d{8,13}$/;
  return regex.test(this as string);
};

String.prototype.toDate = function () {
  return new Date(this as string);
};
