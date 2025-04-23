export {};

declare global {
  interface Location {
    APP_NAME(): string;
  }
}

Location.prototype.APP_NAME = function () {
  let fullpath = this.pathname;

  const pathContainsAtFirstChar = fullpath.charAt(0) == "/";
  if (pathContainsAtFirstChar) {
    fullpath = fullpath.replace("/", "");
  }

  const [appName] = fullpath.split("/");
  return appName;
};
