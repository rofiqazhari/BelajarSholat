import { format } from "date-fns";

export const toISOStringOffset = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'hh:mm:ss");
};
