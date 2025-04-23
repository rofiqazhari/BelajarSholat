import { differenceInDays, format, intervalToDuration } from "date-fns";
import { id } from "date-fns/locale";

declare global {
  interface Date {
    format(fmt: string): string;
    toISOStringOffset(): string;
    toFormatted(): string;
    toFormatMediumID(): string;
    toFormatLongID(): string;
    summary(): string;
    summaryDay(): string;
  }
}

Date.prototype.format = function (fmt: string) {
  return format(this, fmt, { locale: id });
};

Date.prototype.toISOStringOffset = function () {
  return format(this, "yyyy-MM-dd'T'hh:mm:ss");
};

Date.prototype.toFormatted = function () {
  return format(this, "yyyy-MM-dd");
};

Date.prototype.toFormatMediumID = function () {
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return this.toLocaleDateString("id-ID", opts);
};

Date.prototype.toFormatLongID = function () {
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return this.toLocaleTimeString("id-ID", opts);
};

Date.prototype.summary = function () {
  const now = new Date();
  const { years, weeks, months, days } = intervalToDuration({
    start: this,
    end: now,
  });

  const summaryTime = (value: number) => (value < 0 ? "kedepan" : "lalu");

  if (years) return `${Math.abs(years)} Tahun ${summaryTime(years)} `;
  if (months) return `${Math.abs(months)} Bulan ${summaryTime(months)} `;
  if (weeks) return `${Math.abs(weeks)} Minggu ${summaryTime(weeks)} `;
  if (days) return `${Math.abs(days)} Hari ${summaryTime(days)} `;
  return "Hari ini";
};

Date.prototype.summaryDay = function () {
  const now = new Date();
  const days = differenceInDays(this, now);

  if (!days) return "Hari ini";

  return `${Math.abs(days)} Hari ${days < 0 ? "lalu" : "lagi"}`;
};
