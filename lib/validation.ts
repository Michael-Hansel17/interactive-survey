import { z } from "zod";

// We define the regex once here to reuse it
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;

export const surveySchema = z.object({
  namaLengkap: z.string().min(1, "Nama wajib diisi"),
  
  nomorTelepon: z.string()
    .min(1, "Nomor telepon wajib diisi")
    .regex(PHONE_REGEX, "Format nomor HP tidak valid (contoh: 08123456789)"),
    
  tempatKuliah: z.string().min(1, "Tempat kuliah wajib dipilih"),
  
  statusCG: z.enum(["Sudah", "Belum"], {
    error: () => "Status CG tidak valid",
  }),

  coach: z.string().optional(),
  nomorCG: z.string().optional(),
  tempatTinggal: z.string().optional(),
});

export type SurveyData = z.infer<typeof surveySchema>;