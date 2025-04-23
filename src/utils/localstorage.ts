export {};

declare global {
  interface Storage {
    clearExcludes(...keys: string[]): void;
  }
}

Storage.prototype.clearExcludes = function (...keys: string[]) {
  const excludesData = keys
    .map((k) => {
      const data = localStorage.getItem(k);
      if (!k) return undefined;
      return {
        key: k,
        value: data,
      };
    })
    .filter((d) => !!d);

  localStorage.clear();
  excludesData.map((d) => {
    localStorage.setItem(d!.key, d!.value!);
  });
};
