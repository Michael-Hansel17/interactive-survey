import React, { useRef, useState } from "react";
import type { Question } from "../types";

interface QuestionFormProps {
    question: Question;
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onPrevious: () => void;
    questionIndex: number;
    isLastQuestion: boolean;
    isSubmitting?: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
    question,
    value,
    onChange,
    onSubmit,
    onPrevious,
    questionIndex,
    isLastQuestion,
    isSubmitting = false,
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null); // State Error Baru

    const isStandardOption = (val: string) => {
        return question.options?.some((opt) => opt.value === val && opt.value !== "Others");
    };

    const isOtherSelected = value === "Others" || (!!value && !isStandardOption(value));

    // Validasi Input
    const validate = (): boolean => {
        // 1. Cek Required
        if (question.required && !value.trim()) {
            setError("Bagian ini harus diisi ya! 😅");
            return false;
        }

        // 2. Cek Pattern (Regex) - Khusus Text Input
        if (question.type === "text" && question.inputProps?.pattern && value) {
            const regex = new RegExp(question.inputProps.pattern);
            if (!regex.test(value)) {
                // Pesan Error Khusus Nomor Telepon
                if (question.id === 'nomorTelepon') {
                     setError("Nomor HP tidak valid. Pastikan format Indonesia (08xx/628xx) 📱");
                } else {
                     setError("Format pengisian kurang tepat.");
                }
                return false;
            }
        }

        setError(null); // Clear error jika lolos
        return true;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isSubmitting) {
            e.preventDefault();
            if (validate()) {
                onSubmit();
            }
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (validate()) {
            onSubmit();
        }
    };

    // Reset error saat user mulai mengetik lagi
    const handleChange = (val: string) => {
        if (error) setError(null);
        onChange(val);
    };

    const handleOptionPick = (optionValue: string) => {
        if (isSubmitting) return;
        if (error) setError(null);

        if (optionValue === "Others") {
            handleChange("Others");
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            handleChange(optionValue);
        }
    };

    const handleOtherInputChange = (text: string) => {
        if (!isSubmitting) handleChange(text);
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="w-full flex flex-col gap-5 relative z-10"
            noValidate={true} // Matikan validasi browser bawaan (yang jelek)
        >
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white mb-2 drop-shadow-md">
                {question.label}
            </h2>

            {/* TEXT INPUT */}
            {question.type === "text" && (
                <div className="w-full">
                    <input
                        type="text"
                        placeholder={question.placeholder}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSubmitting}
                        className={`w-full text-lg p-4 bg-black/40 text-white border-2 rounded-xl focus:outline-none transition-all font-bold tracking-wide disabled:opacity-50 
                        ${error 
                            ? "border-red-500 shadow-[0_0_10px_#ef4444]" // Style Error (Merah Neon)
                            : "border-[var(--color-border)] focus:border-primary focus:shadow-[0_0_8px_var(--color-primary)]"
                        }`}
                        autoFocus
                    />
                    {/* PESAN ERROR DI BAWAH INPUT */}
                    {error && (
                        <p className="text-red-400 text-sm font-bold mt-2 animate-pulse bg-black/20 p-2 rounded-lg inline-block border border-red-500/50">
                            ⚠️ {error}
                        </p>
                    )}
                </div>
            )}

            {/* CHOICE INPUT */}
            {question.type === "choice" && question.options && (
                <div className="flex flex-col gap-3">
                     {/* Pesan Error untuk Choice (Jika belum pilih) */}
                     {error && (
                        <p className="text-red-400 text-sm font-bold mb-2 animate-pulse">
                            ⚠️ {error}
                        </p>
                    )}

                    {question.options.map((opt) => {
                        const isChecked = opt.value === "Others" ? isOtherSelected : value === opt.value;
                        return (
                            <div key={opt.value} className="flex flex-col gap-2">
                                <label
                                    className={`group flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    } ${
                                        isChecked
                                            ? "bg-primary/20 border-primary shadow-[0_0_8px_rgba(255,106,193,0.3)]"
                                            : "bg-black/30 border-transparent hover:border-white/30 hover:bg-black/50"
                                    }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                            isChecked
                                                ? "border-primary bg-primary shadow-[0_0_6px_var(--color-primary)]"
                                                : "border-gray-500"
                                        }`}
                                    >
                                        {isChecked && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>

                                    <input
                                        type="radio"
                                        name={question.id}
                                        value={opt.value}
                                        checked={isChecked}
                                        onChange={() => handleOptionPick(opt.value)}
                                        className="hidden"
                                        disabled={isSubmitting}
                                    />

                                    <span
                                        className={`text-lg font-bold transition-all ${
                                            isChecked ? "text-neon-blue" : "text-gray-300 group-hover:text-white"
                                        }`}
                                    >
                                        {opt.label}
                                    </span>
                                </label>

                                {opt.value === "Others" && isChecked && (
                                    <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Tulis nama kampus/tempat kerjamu..."
                                            value={value === "Others" ? "" : value}
                                            onChange={(e) => handleOtherInputChange(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="w-full text-base p-3 bg-black/40 text-white border-b-2 border-primary focus:outline-none placeholder:text-gray-500 font-medium tracking-wide disabled:opacity-50"
                                            autoFocus
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6 pt-4 border-t border-[var(--color-border)]">
                {questionIndex > 0 && (
                    <button
                        type="button"
                        onClick={onPrevious}
                        disabled={isSubmitting}
                        className="flex-1 text-base font-bold text-white py-3 px-5 rounded-xl border-2 border-white bg-transparent hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider shadow-[0_0_5px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 text-base font-bold text-white bg-transparent border-2 border-primary py-3 px-5 rounded-xl transition-all uppercase tracking-wider shadow-[0_0_15px_var(--color-primary)] ${
                        isSubmitting 
                        ? "opacity-70 cursor-wait animate-pulse" 
                        : "hover:bg-primary/20 hover:scale-[1.02] active:scale-95"
                    }`}
                >
                    {isSubmitting 
                        ? "Processing..." 
                        : (isLastQuestion ? "Submit" : "Next")
                    }
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;