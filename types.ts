// export interface Question {
//   id: string;
//   text: string;
//   type: 'text' | 'email' | 'number';
//   placeholder: string;
// }

export type Answers = Record<string, string>;

export type QuestionType = "text" | "choice";

export type QuestionId =
    | "Nama Lengkap"
    | "Nomor Telepon"
    | "Status CG"
    | "Tempat Tinggal"
    | "Tempat Kuliah"
    | "Nomor CG";

export type Question = {
    id: QuestionId;
    text: string;
    type: QuestionType;
    placeholder?: string;
    // untuk input <input />
    inputProps?: {
        inputMode?: "text" | "tel" | "numeric";
        pattern?: string; // regex string
    };
    // untuk pilihan <select / radio>
    options?: { label: string; value: string }[];
    // next linear default (kalau tidak ada cabang)
    next?: QuestionId | null;
    // cabang berdasarkan jawaban user (dipakai kalau type === 'choice' atau ingin bercabang)
    branch?: { value: string | RegExp; goTo: QuestionId }[];
    required?: boolean;
};

export type SubmitStatus = "idle" | "submitting" | "success" | "error";
