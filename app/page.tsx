"use client";

import { useState, useEffect } from "react";
import QuestionForm from "@/components/QuestionForm";
import ProgressBar from "@/components/ProgressBar";
import { questions } from "@/constants";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(questions[0].id);
  const [history, setHistory] = useState<string[]>([]); // Untuk tombol Back
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const currentQuestionIndex = questions.findIndex((q) => q.id === currentQuestionId);

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: value }));
  };

  const handleNext = async () => {
    if (!currentQuestion) return;

    const answerValue = answers[currentQuestionId];
    let nextId = currentQuestion.next;

    if (currentQuestion.branch) {
      const matchedBranch = currentQuestion.branch.find((b) => b.value === answerValue);
      if (matchedBranch) {
        nextId = matchedBranch.goTo;
      }
    }

    if (nextId) {
      setHistory((prev) => [...prev, currentQuestionId]);
      setCurrentQuestionId(nextId);
    } else {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Terjadi kesalahan saat menyimpan data.");
        }

        router.push("/success");
        
      } catch (error: any) {
        console.error("Error submitting survey:", error);
        alert("Gagal mengirim data: " + (error.message || "Coba lagi nanti."));
      }
    }
  };

  const handlePrevious = () => {
    setHistory((prev) => {
      const newHistory = [...prev];
      const prevId = newHistory.pop(); 
      if (prevId) {
        setCurrentQuestionId(prevId);
      }
      return newHistory;
    });
  };

  const processText = (text: string) => {
    if (!text) return "";
    
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      if (key === "firstName") {
        const fullName = answers["namaLengkap"] || "";
        return fullName.split(" ")[0];
      }
      
      return answers[key] || ""; 
    });
  };

  if (!isClient || !currentQuestion) return null;

  const processedQuestion = {
    ...currentQuestion,
    label: processText(currentQuestion.label),
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Dekorasi Background Blob */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[80px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[80px] -z-10 animate-pulse delay-700"></div>

      <div className="w-full max-w-2xl bg-[var(--color-card)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-3xl shadow-2xl p-6 sm:p-10 relative">
        
        <h1 className="text-4xl sm:text-6xl font-bold text-center tracking-wide mb-8 mt-2 text-neon">
            SURVEY ZONE
        </h1>

        <div className="mb-8">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
          <p className="text-right text-xs font-bold text-gray-400 mt-2 tracking-wider">
            STEP {currentQuestionIndex + 1} OF {questions.length}
          </p>
        </div>

        <QuestionForm
          question={processedQuestion}
          value={answers[currentQuestionId] || ""}
          onChange={handleAnswerChange}
          onSubmit={handleNext}
          onPrevious={handlePrevious}
          questionIndex={history.length} 
          isLastQuestion={!currentQuestion.next && !currentQuestion.branch}
        />
      </div>
    </main>
  );
}