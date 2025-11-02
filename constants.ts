// import type { Question } from './types';

import { Question } from "./types";

// export const QUESTIONS: Question[] = [
//   {
//     id: 'Nama Lengkap',
//     text: "Aku Sheepy 🐑. Aku mau kenalan nih, kasih tau dong nama lengkapmu",
//     type: 'text',
//     placeholder: 'e.g., Alex Smith',
//   },
//   {
//     id: 'Nomor Telepon',
//     text: "Senang kenal kamu! Boleh minta nomor telepon (atau WhatsApp) kamu biar Sheepy bisa follow-up ya 📱",
//     type: 'text',
//     placeholder: 'e.g., 081234567890',
//   },
//   {
//     id: 'Status CG',
//     text: 'Kamu udah gabung Connect Group belum? Sudah atau Belum',
//     type: 'text',
//     placeholder: 'e.g., Sudah atau Blum',
//   },
//   {
//     id: 'Tempat Tinggal',
//     text: 'Kamu sekarang tinggal di mana nih? 🏠',
//     type: 'text',
//     placeholder: 'e.g., 8',
//   },
//   {
//     id: 'Tempat Kuliah',
//     text: 'Kamu lagi kuliah di mana, atau udah kerja? (Tuliskan nama kampus atau tempat kerja)',
//     type: 'text',
//     placeholder: 'e.g., Universitas Pradita / Bekerja di Tokopedia',
//   },
//   {
//     id: 'Nomor CG',
//     text: 'Kalau kamu sudah join CG, tulis nomor CG kamu ya ✨',
//     type: 'text',
//     placeholder: 'e.g., CG 59',
//   },
// ];
// Types opsional (biar enak di-TS)

// DATA PERTANYAAN
export const QUESTIONS: Question[] = [
    {
        id: "Nama Lengkap",
        text: "Aku Sheepy 🐑. Aku mau kenalan nih, kasih tau dong nama lengkapmu",
        type: "text",
        placeholder: "e.g., Alex Smith",
        inputProps: { inputMode: "text" },
        required: true,
        next: "Nomor Telepon",
    },
    {
        id: "Nomor Telepon",
        text: "Senang kenal {{firstName}}! Boleh minta nomor telepon (atau WhatsApp) kamu biar Sheepy bisa follow-up ya 📱",
        type: "text",
        placeholder: "e.g., 081234567890",
        inputProps: {
            inputMode: "tel",
            // Contoh pola umum nomor Indo (opsional, silakan sesuaikan)
            pattern: "^(\\+62|62|0)\\d{8,13}$",
        },
        required: true,
        next: "Status CG",
    },
    {
        id: "Status CG",
        text: "{{firstName}}, Kamu udah gabung Connect Group belum?",
        type: "choice",
        options: [
            { label: "Sudah", value: "Sudah" },
            { label: "Belum", value: "Belum" },
        ],
        // cabang: kalau "Sudah" => Nomor CG, kalau "Belum" => Tempat Tinggal
        branch: [
            { value: "Sudah", goTo: "Nomor CG" },
            { value: "Belum", goTo: "Tempat Tinggal" },
        ],
        // fallback kalau tidak ada yang match (mis. user ngetik manual)
        next: "Tempat Tinggal",
        required: true,
    },
    {
        id: "Tempat Tinggal",
        text: "{{firstName}}, kamu sekarang tinggal di mana nih? 🏠",
        type: "text",
        placeholder: "e.g., Jakarta Barat",
        inputProps: { inputMode: "text" },
        required: true,
        next: "Tempat Kuliah",
    },
    {
        id: "Tempat Kuliah",
        text: "{{firstName}}, kamu lagi kuliah di mana, atau udah kerja? (Tuliskan nama kampus atau tempat kerja)",
        type: "text",
        placeholder: "e.g., Universitas Pradita / Bekerja di Tokopedia",
        inputProps: { inputMode: "text" },
        required: true,
        next: null, // selesai (submit)
    },
    {
        id: "Nomor CG",
        text: "{{firstName}}, kalau kamu sudah join CG, tulis nomor CG kamu ya ✨",
        type: "text",
        placeholder: "e.g., CG-59",
        inputProps: { inputMode: "text" },
        required: true,
        next: null, // selesai (submit)
    },
];
