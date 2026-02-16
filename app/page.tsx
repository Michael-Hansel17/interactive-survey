"use client";

import { useState, useEffect, useRef } from "react";
import QuestionForm from "@/components/QuestionForm";
import ProgressBar from "@/components/ProgressBar";
import WelcomeScreen from "@/components/WelcomeScreen";
import MusicPlayer, { MusicPlayerRef } from "@/components/MusicPlayer";
import Toast from "@/components/Toast";
import { questions } from "@/constants";
import { useSurvey } from "@/hooks/useSurvey";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  const {
    surveyStarted,
    startSurvey,
    currentQuestion,
    currentQuestionIndex,
    answers,
    setAnswer,
    goNext,
    goBack,
    processText,
    isSubmitting,
    submitError,
    historyLength,
  } = useSurvey();

  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (submitError) {
      setToastMessage(submitError);
    }
  }, [submitError]);

  const handleStartSurvey = () => {
    startSurvey();
    musicPlayerRef.current?.unmuteAndPlay();
  };

  if (!isClient) return null;

  const processedQuestion = currentQuestion ? {
    ...currentQuestion,
    label: processText(currentQuestion.label),
  } : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <MusicPlayer ref={musicPlayerRef} />
      
      {/* Toast Notification for API Errors */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[80px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[80px] -z-10 animate-pulse delay-700"></div>

      <div className="w-full max-w-2xl bg-[var(--color-card)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-3xl shadow-2xl p-6 sm:p-10 relative">
        <h1 className="text-3xl sm:text-5xl font-bold text-center tracking-wide mb-8 mt-2 text-neon">
            SURVEY ZONE
        </h1>

        {!surveyStarted ? (
          <WelcomeScreen onStart={handleStartSurvey} />
        ) : (
          processedQuestion && (
            <>
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
                value={answers[processedQuestion.id] || ""}
                onChange={setAnswer}
                onSubmit={goNext}
                onPrevious={goBack}
                questionIndex={historyLength}
                isLastQuestion={!processedQuestion.next && !processedQuestion.branch}
                isSubmitting={isSubmitting}
              />
            </>
          )
        )}
      </div>
    </main>
  );
}