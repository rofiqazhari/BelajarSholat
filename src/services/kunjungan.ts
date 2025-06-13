import { KunjunganDokter } from "@/models/KunjunganDokter";
import { KunjunganPoliklinik } from "@/models/KunjunganPoliklinik";
import { KunjunganTanggal } from "@/models/KunjunganTanggal";
import { axios, formatResponse } from "@/plugins/axios";

import { RestResource } from "@/models";

const BASE_URL = `${import.meta.env.VITE_API_HOST}`;

export async function kunjunganTanggal(tgl1: string, tgl2: string) {
  const url = `${BASE_URL}/kunjungan`;

  const response = await axios.get<RestResource<KunjunganTanggal[]>>(url, {
    params: {
      tgl1: tgl1,
      tgl2: tgl2,
      token: "BakisEnde",
    },
  });

  return formatResponse<KunjunganTanggal[]>(KunjunganTanggal, response);
}

export async function kunjunganDokter(tgl1: string, tgl2: string) {
  const url = `${BASE_URL}/kunjungan_dokter`;

  const response = await axios.get<RestResource<KunjunganDokter[]>>(url, {
    params: {
      tgl1: tgl1,
      tgl2: tgl2,
      token: "BakisEnde",
    },
  });

  return formatResponse<KunjunganDokter[]>(KunjunganDokter, response);
}

export async function kunjunganPoliklinik(tgl1: string, tgl2: string) {
  const url = `${BASE_URL}/kunjungan_dokter`;

  const response = await axios.get<RestResource<KunjunganPoliklinik[]>>(url, {
    params: {
      tgl1: tgl1,
      tgl2: tgl2,
      token: "BakisEnde",
    },
  });

  return formatResponse<KunjunganPoliklinik[]>(KunjunganPoliklinik, response);
}
