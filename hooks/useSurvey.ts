import { useState, useCallback } from "react";
import { questions } from "@/constants";
import { useRouter } from "next/navigation";

const TEMPLATE_REGEX = /\{\{(\w+)\}\}/g;

export function useSurvey() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(
    questions[0].id,
  );
  const [history, setHistory] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const currentQuestionIndex = questions.findIndex(
    (q) => q.id === currentQuestionId,
  );

  const startSurvey = () => setSurveyStarted(true);

  const setAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: value }));
  };

  const processText = useCallback(
    (text: string) => {
      if (!text) return "";
      return text.replace(TEMPLATE_REGEX, (_, key) => {
        if (key === "firstName") {
          const fullName = answers["namaLengkap"] || "";
          return fullName.split(" ")[0];
        }
        return answers[key] || "";
      });
    },
    [answers],
  );

  const goNext = async () => {
    if (!currentQuestion) return;

    const answerValue = answers[currentQuestionId];
    let nextId = currentQuestion.next;

    if (currentQuestion.branch) {
      const matchedBranch = currentQuestion.branch.find(
        (b) => b.value === answerValue,
      );
      if (matchedBranch) {
        nextId = matchedBranch.goTo;
      }
    }

    if (nextId) {
      setHistory((prev) => [...prev, currentQuestionId]);
      setCurrentQuestionId(nextId);
    } else {
      await submitData();
    }
  };

  const goBack = () => {
    if (isSubmitting) return;
    setHistory((prev) => {
      const newHistory = [...prev];
      const prevId = newHistory.pop();
      if (prevId) {
        setCurrentQuestionId(prevId);
      }
      return newHistory;
    });
  };

  const submitData = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menyimpan data.");
      }

      router.push("/success");
    } catch (error: any) {
      console.error("Submission Error:", error);
      setSubmitError(error.message || "Terjadi kesalahan. Coba lagi.");
      setIsSubmitting(false);
    }
  };

  return {
    surveyStarted,
    currentQuestion,
    currentQuestionIndex,
    answers,
    isSubmitting,
    submitError,
    historyLength: history.length,

    startSurvey,
    setAnswer,
    goNext,
    goBack,
    processText,
  };
}
