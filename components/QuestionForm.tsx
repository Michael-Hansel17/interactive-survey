import React, { useRef } from "react";
import type { Question } from "../types";

interface QuestionFormProps {
    question: Question;
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onPrevious: () => void;
    questionIndex: number;
    isLastQuestion: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
    question,
    value,
    onChange,
    onSubmit,
    onPrevious,
    questionIndex,
    isLastQuestion,
}) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        onSubmit();
    };

    const handleOptionPick = (optionValue: string) => {
        onChange(optionValue);
        // setTimeout(() => {
        //     formRef.current?.requestSubmit();
        // }, 200);
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="w-full flex flex-col gap-5 relative z-10" // Gap dikurangi sedikit (6 -> 5)
            noValidate={false}
        >
            {/* PERTANYAAN: Ukuran dikecilkan (text-3xl -> text-2xl) */}
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white mb-2 drop-shadow-md">
                {question.label}
            </h2>

            {question.type === "text" && (
                <input
                    type="text"
                    placeholder={question.placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required={question.required}
                    // INPUT: text-xl -> text-lg
                    className="w-full text-lg p-4 bg-black/40 text-white border-2 border-[var(--color-border)] rounded-xl focus:outline-none focus:border-primary focus:shadow-[0_0_8px_var(--color-primary)] transition-all placeholder:text-gray-500 font-bold tracking-wide"
                    autoFocus
                />
            )}

            {question.type === "choice" && question.options && (
                <div className="flex flex-col gap-3">
                    {question.options.map((opt) => (
                        <label
                            key={opt.value}
                            className={`group flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                value === opt.value 
                                    ? "bg-primary/20 border-primary shadow-[0_0_8px_rgba(255,106,193,0.3)]" 
                                    : "bg-black/30 border-transparent hover:border-white/30 hover:bg-black/50"
                            }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                value === opt.value ? 'border-primary bg-primary shadow-[0_0_6px_var(--color-primary)]' : 'border-gray-500'
                            }`}>
                                {value === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            
                            <input
                                type="radio"
                                name={question.id}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={() => handleOptionPick(opt.value)}
                                className="hidden"
                                required={question.required}
                            />
                            
                            {/* OPSI: text-xl -> text-lg */}
                            <span className={`text-lg font-bold transition-all ${value === opt.value ? 'text-neon-blue' : 'text-gray-300 group-hover:text-white'}`}>
                                {opt.label}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            <div className="flex gap-4 mt-6 pt-4 border-t border-[var(--color-border)]">
                {questionIndex > 0 && (
                    <button
                        type="button"
                        onClick={onPrevious}
                        // TOMBOL: text-lg -> text-base, padding dikurangi sedikit
                        className="flex-1 text-base font-bold text-white py-3 px-5 rounded-xl border-2 border-white bg-transparent hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                    >
                        Back
                    </button>
                )}
                <button
                    type="submit"
                    // TOMBOL: text-lg -> text-base, padding dikurangi sedikit
                    className="flex-1 text-base font-bold text-white bg-transparent border-2 border-primary py-3 px-5 rounded-xl hover:bg-primary/20 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_var(--color-primary)] uppercase tracking-wider"
                >
                    {isLastQuestion ? "Submit" : "Next"}
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;