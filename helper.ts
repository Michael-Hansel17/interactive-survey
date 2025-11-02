import { QUESTIONS } from "./constants";
import { Question, QuestionId } from "./types";

export const QUESTION_MAP = Object.fromEntries(
    QUESTIONS.map((q) => [q.id, q])
) as Record<QuestionId, Question>;

export function getNextQuestionId(
    currentId: QuestionId,
    answer: string
): QuestionId | null {
    const q = QUESTION_MAP[currentId];
    if (!q) return null;

    if (q.branch && answer != null) {
        const hit = q.branch.find((b) =>
            typeof b.value === "string"
                ? b.value.toLowerCase() === (answer || "").toLowerCase()
                : b.value.test(answer)
        );
        if (hit) return hit.goTo;
    }

    return q.next ?? null;
}

export function calculateTotalSteps(answers: Record<string, string>): number {
    const status = answers["Status CG"];

    if (!status) {
        // kalau belum jawab Status CG, tampilkan estimasi total maksimal (semua kemungkinan)
        return 5;
    }

    if (status.toLowerCase() === "sudah") {
        // Sudah join CG → cuma 1 pertanyaan lanjutan (Nomor CG)
        return 4;
    }

    if (status.toLowerCase() === "belum") {
        // Belum join CG → 2 pertanyaan lanjutan (Tempat Tinggal + Tempat Kuliah)
        return 5;
    }

    // default (fallback)
    return 5;
}

export function getFirstName(fullName: string): string {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
}
