import { Question } from "./types";

export const questions: Question[] = [
    {
        id: "namaLengkap",
        label: "Let's get started. Siapa nama lengkap kamu?", 
        type: "text",
        placeholder: "Tulis namamu disini...",
        inputProps: { inputMode: "text" },
        required: true,
        next: "nomorTelepon",
    },
    {
        id: "nomorTelepon",
        label: "Halo {{firstName}}! Boleh minta nomor WhatsApp kamu? Kita mau keep in touch.",
        type: "text",
        placeholder: "08xxxxxxxxxx",
        inputProps: {
            inputMode: "tel",
            pattern: "^(\\+62|62|0)\\d{8,13}$",
        },
        required: true,
        next: "statusCG",
    },
    {
        id: "statusCG",
        label: "{{firstName}}, kamu sudah gabung Connect Group (CG) belum?",
        type: "choice",
        options: [
            { label: "Sudah Join", value: "Sudah" },
            { label: "Belum Join", value: "Belum" },
        ],
        branch: [
            { value: "Sudah", goTo: "nomorCG" },
            { value: "Belum", goTo: "tempatTinggal" },
        ],
        next: "tempatTinggal",
        required: true,
    },
    {
        id: "tempatTinggal",
        label: "Domisili kamu sekarang di daerah mana?",
        type: "text",
        placeholder: "Contoh: Gading Serpong, BSD, Jakarta Barat...",
        inputProps: { inputMode: "text" },
        required: true,
        next: "tempatKuliah",
    },
    {
        id: "tempatKuliah",
        // UBAH DISINI: Jadi Pilihan Ganda
        label: "Sekarang lagi sibuk kuliah di mana?",
        type: "choice",
        options: [
            { label: "UMN", value: "UMN" },
            { label: "Pradita", value: "Pradita" },
            { label: "Matana", value: "Matana" },
            { label: "Others", value: "Others" },
        ],
        required: true,
        next: null, // Selesai setelah memilih
    },
    {
        id: "nomorCG",
        label: "Cool! Kamu gabung di CG nomor berapa?",
        type: "text",
        placeholder: "Contoh: CG 59",
        inputProps: { inputMode: "text" },
        required: true,
        next: null,
    },
];