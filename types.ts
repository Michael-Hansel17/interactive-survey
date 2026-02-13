// export interface Question {
//   id: string;
//   text: string;
//   type: 'text' | 'email' | 'number';
//   placeholder: string;
// }

export type Answers = Record<string, string>;

export type QuestionType = "text" | "choice";

export type QuestionId =
    | "namaLengkap"
    | "nomorTelepon"
    | "statusCG"
    | "tempatTinggal"
    | "tempatKuliah"
    | "nomorCG"
    | "coach"

export type Question = {
    id: QuestionId;
    
    // UBAH: 'text' diganti jadi 'label' agar konsisten dengan component QuestionForm
    label: string; 
    
    type: QuestionType;
    placeholder?: string;
    
    // Props untuk input HTML
    inputProps?: {
        inputMode?: "text" | "tel" | "numeric" | "email";
        pattern?: string; // string regex untuk validasi
    };
    
    // Untuk pilihan ganda (radio button)
    options?: { label: string; value: string }[];
    
    // Navigasi Linear (Default jika tidak ada percabangan)
    next?: QuestionId | null;
    
    // Navigasi Cabang (Branching) berdasarkan jawaban
    branch?: { 
        value: string; // Jawaban pemicu (misal: "Sudah")
        goTo: QuestionId; // Tujuan jika jawaban cocok
    }[];
    
    required?: boolean;
};

export type SubmitStatus = "idle" | "submitting" | "success" | "error";