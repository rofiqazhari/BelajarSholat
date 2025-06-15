export class DataPeserta {
  idc: number;
  nama_peserta: string;
  no_hp: string;
  email: string;
  alamat: string;
  level: string;

  constructor(
    idc: number,
    nama_peserta: string,
    no_hp: string,
    email: string,
    alamat: string,
    level: string
  ) {
    this.idc = idc;
    this.nama_peserta = nama_peserta;
    this.no_hp = no_hp;
    this.email = email;
    this.alamat = alamat;
    this.level = level;
  }
}
