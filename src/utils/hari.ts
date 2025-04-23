export { AHAD, SENIN, SELASA, RABU, KAMIS, JUMAT, SABTU };

const AHAD = 1;
const SENIN = 2;
const SELASA = 3;
const RABU = 4;
const KAMIS = 5;
const JUMAT = 6;
const SABTU = 7;

export function namaHari(i: number): string {
  switch (i) {
    case AHAD:
      return "Ahad";

    case SENIN:
      return "Senin";

    case SELASA:
      return "Selasa";

    case RABU:
      return "Rabu";

    case KAMIS:
      return "Kamis";

    case JUMAT:
      return "Jum'at";

    case SABTU:
      return "Sabtu";

    default:
      return "-";
  }
}
