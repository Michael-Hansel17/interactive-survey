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
            pattern: "^(\\+62|62|0)8[1-9][0-9]{6,11}$",
        },
        required: true,
        next: "tempatKuliah",
    },
    {
        id: "tempatKuliah",
        label: "Sekarang lagi sibuk kuliah di mana?",
        type: "choice",
        options: [
            { label: "UMN", value: "UMN" },
            { label: "Pradita", value: "Pradita" },
            { label: "Matana", value: "Matana" },
            { label: "Others", value: "Others" },
        ],
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
            { value: "Sudah", goTo: "coach" },
            { value: "Belum", goTo: "tempatTinggal" },
        ],
        next: "tempatTinggal",
        required: true,
    },
    {
        id: "coach",
        label: "Sekarang kamu dipengembalan coach siapa?",
        type: "choice",
        options: [
            { label: "Coach Nael & Shella", value: "Coach Nael & Shella" },
            { label: "Coach Ciella", value: "Ciella" },
            { label: "Coach Debora", value: "Debora" },
            { label: "Coach Erick", value: "Erick" },
            { label: "⁠Coach Kebob", value: "Kebob" },
            { label: "Coach Keycia", value: "Keycia" },
            { label: "Coach Mike", value: "Mike" },
        ],
        required: true,
        next: "nomorCG",
    },
    {
        id: "nomorCG",
        label: "Cool! Kamu gabung di CG nomor berapa?",
        type: "text",
        placeholder: "Contoh: 59",
        inputProps: { inputMode: "text" },
        required: true,
        next: null,
    },
    {
        id: "tempatTinggal",
        label: "Domisili kamu sekarang di daerah mana?",
        type: "text",
        placeholder: "Contoh: Gading Serpong, BSD, Jakarta Barat...",
        inputProps: { inputMode: "text" },
        required: true,
        next: null,
    },
    
];