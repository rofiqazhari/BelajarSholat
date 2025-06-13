import { KunjunganDokter } from "@/models/KunjunganDokter";
import { axios, formatResponse } from "@/plugins/axios";

import { RestResource } from "@/models";

const BASE_URL = `${import.meta.env.VITE_API_HOST}`;

export async function kunjunganDokter(tgl1: string, tgl2: string) {
  const url = `${BASE_URL}/kunjungan_dokter`;

  const response = await axios.get<RestResource<KunjunganDokter[]>>(url, {
    params: {
      tgl1: tgl1,
      tgl2: tgl2,
    },
  });

  return formatResponse<KunjunganDokter[]>(KunjunganDokter, response);
}
