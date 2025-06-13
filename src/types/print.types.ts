export type TCetakPendaftaranRequest = {
  id: number;
  antrian: number;
  sep?: string;
  tanggalSep?: string;
  namaPasien: string;
  noRM: string;
  tglLahirPasien: string;
  tanggal: string;
  dokter: string;
  lokasi: string;
  layanan: string;
  subLayanan: string;
  japer?: number;
  karcis?: number;
};

export type TCetak<T> = {
  address?: string;
  connectionId?: string;
  printerName: string;
  item: T;
};

export type TCetakKarcisAntrian = {
  antrian: string;
  jenisPasien: string;
  nomorSudahTerlayani: string;
  messages?: string[];
};

export type TCetakFeeRujukan = {
  tanggal: string;
  noRm: string;
  pasien: string;
  perujuk: string;
  perujukDetail: string;
  kategoriRujukan: string;
  feeRujukan: number;
};

export type TCetakSKDP = {
  noSKDP: string;
  dokter: string;
  pasien: string;
  noKartu: string;
  tanggalLahir: string;
  diagnosa: string;
  tanggalRencanaKontrol: string;
};
