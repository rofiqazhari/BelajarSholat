/**
 * Generic Type untuk membuat value item
 * Value item adalah object yang memiliki title dan value
 * Object ini biasanya digunakan untuk membuat dropdown
 */
export type TDropdownItem<T> = {
  /** Tersembunyi jika belum login */
  title: string;

  /** Route Title */
  value: T;
};

export function getDropdownItemTitle<T>(items: TDropdownItem<T>[], value: T): string | null {
  return items.find((x) => x.value == value)?.title ?? null;
}
