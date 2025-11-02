// 'use client';

// import SheepCharacter from '@/components/SheepCharacter';
// import ProgressBar from '@/components/ProgressBar';
// import SpeechBubble from '@/components/SpeechBubble';
// import { useMemo, useRef, useState } from 'react';
// import { QUESTIONS} from '../constants';
// import {QUESTION_MAP, calculateTotalSteps, getFirstName, getNextQuestionId} from '../helper'
// import type { QuestionId, Question, SubmitStatus } from '../types';
// import QuestionForm from '@/components/QuestionForm';

// type Answers = Record<string, string>;

// export default function Home() {
//   // Mulai dari pertanyaan pertama di array (bisa juga hardcode 'Nama Lengkap')
//   const firstQuestionId = QUESTIONS[0].id as QuestionId;

//   const [currentQuestionId, setCurrentQuestionId] = useState<QuestionId | null>(firstQuestionId);
//   const [answers, setAnswers] = useState<Answers>({});
//   const [currentAnswer, setCurrentAnswer] = useState('');
//   const [history, setHistory] = useState<QuestionId[]>([]); // jejak pertanyaan yg sudah dilalui

//   const isFinished = currentQuestionId === null;

//   // Pertanyaan aktif (null kalau selesai)
//   const currentQuestion: Question | null = useMemo(
//     () => (currentQuestionId ? QUESTION_MAP[currentQuestionId] : null),
//     [currentQuestionId]
//   );

//   const firstName = getFirstName(answers['Nama Lengkap'] || '');
//   const currentQuestionText = currentQuestion?.text.replace(
//     '{{firstName}}',
//     firstName || 'kamu'
//   );

//   // Progress dinamis: langkah yang sudah dilewati (history) + pertanyaan aktif
//   const totalSteps = calculateTotalSteps(answers);
//   const currentStep = isFinished ? totalSteps : Math.min(history.length + 1, totalSteps);

//   const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
//   const [submitError, setSubmitError] = useState<string>('');
//   const submittingRef = useRef(false);

//   async function submitToSheets(payload: Record<string, string>) {
//     // cegah double submit (mis. fast re-render)
//     if (submittingRef.current) return;
//     submittingRef.current = true;

//     try {
//       setSubmitStatus('submitting');
//       setSubmitError('');

//       const res = await fetch('/api/submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ answers: payload }),
//       });

//       if (!res.ok) {
//         const e = await res.json().catch(() => ({} as any));
//         throw new Error(e?.error || `Request failed with ${res.status}`);
//       }

//       setSubmitStatus('success');
//     } catch (err: any) {
//       setSubmitStatus('error');
//       setSubmitError(err?.message || 'Unknown error');
//       console.error('Submit error:', err);
//     } finally {
//       submittingRef.current = false;
//     }

//   }

//   const handleNextQuestion = () => {
//     if (!currentQuestion) return;
//     if (currentAnswer.trim() === '') return;

//     const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
//     setAnswers(newAnswers);
//     setCurrentAnswer('');

//     const nextId = getNextQuestionId(currentQuestion.id as QuestionId, currentAnswer);

//     // simpan jejak buat tombol Back
//     setHistory((prev) => [...prev, currentQuestion.id as QuestionId]);

//     if (nextId === null) {
//       // flow selesai → submit ke Google Sheets
//       submitToSheets(newAnswers);
//     }

//     setCurrentQuestionId(nextId);
//   };

//   const handlePreviousQuestion = () => {
//     if (history.length === 0) return;

//     // pop id terakhir dari history untuk kembali ke pertanyaan sebelumnya
//     const prevHistory = [...history];
//     const prevId = prevHistory.pop() as QuestionId;

//     // ambil jawaban sebelumnya (jika ada) untuk prefilling
//     const prevAnswer = answers[prevId] ?? '';

//     setHistory(prevHistory);
//     setCurrentQuestionId(prevId);
//     setCurrentAnswer(prevAnswer);
//   };

//   const backgroundPatternUri = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgo8cGF0aCBkPSJNNCAyMEwzMCAyMEw0MCAzMEwzMCA0MEw0IDQwWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA0KSIvPgo8cGF0aCBkPSJNNjAgNEw4MCA0TDgwIDMwTDcwIDIwWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA0KSIvPgo8cGF0aCBkPSJNNjAgODBMOTAgOTBMOTAgNjBaIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDQpIi8+CjxjaXJjbGUgY3g9Ijg1IiBjeT0iNDUiIHI9IjUiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz4KPC9zdmc+')`;

//   if (isFinished) {
//     const finishedBackgroundStyle = {
//       backgroundColor: '#ffedd5', // bg-orange-100
//       backgroundImage: backgroundPatternUri,
//     };
//     return (
//       <div
//         className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans"
//         style={finishedBackgroundStyle}
//       >
//         <div className="w-full max-w-2xl text-center bg-white p-8 border-4 border-black shadow-[10px_10px_0px_#000]">
//           <h1 className="text-4xl md:text-5xl font-extrabold font-mono mb-4 text-green-600">
//             ROOAARSOME!
//           </h1>
//           <p className="text-xl mb-6">Thanks for your answers.</p>

//           {/* STATUS BANNER */}
//           {submitStatus === 'submitting' && (
//             <div className="mb-6 p-4 border-2 border-black bg-yellow-200 font-mono shadow-[4px_4px_0px_#000]">
//               <span className="animate-pulse">Mengirim… mohon tunggu sebentar</span>
//             </div>
//           )}
//           {submitStatus === 'success' && (
//             <div className="mb-6 p-4 border-2 border-black bg-green-200 font-mono shadow-[4px_4px_0px_#000]">
//               ✅ Berhasil terkirim 🎉
//             </div>
//           )}
//           {submitStatus === 'error' && (
//             <div className="mb-6 p-4 border-2 border-black bg-red-200 font-mono shadow-[4px_4px_0px_#000]">
//               ❌ Gagal mengirim. {submitError ? `(${submitError})` : ''}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   const surveyBackgroundStyle = {
//     backgroundColor: '#bae6fd', // bg-blue-200
//     backgroundImage: backgroundPatternUri,
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans"
//       style={surveyBackgroundStyle}
//     >
//       <div className="w-full max-w-6xl space-y-8">
//         <header>
//           <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-2 font-mono text-center">
//             Welcome to Sheepy Survey
//           </h1>
//           {/* Progress dinamis berdasarkan jejak langkah */}
//           <ProgressBar current={currentStep} total={totalSteps} />
//         </header>

//         <main className="w-full flex flex-col md:flex-row items-center gap-8">
//           <SheepCharacter />
//           <div className="w-full flex flex-col items-start gap-6">
//             {currentQuestionText && <SpeechBubble text={currentQuestionText} />}
//             {currentQuestion && (
//               <QuestionForm
//                 question={currentQuestion}
//                 value={currentAnswer}
//                 onChange={setCurrentAnswer}
//                 onSubmit={handleNextQuestion}
//                 onPrevious={handlePreviousQuestion}
//                 // untuk UI lama yang pakai index, kita tetap kasih info langkah sekarang:
//                 questionIndex={history.length}
//                 // isLastQuestion tidak relevan untuk cabang; biarkan false supaya tombol "Next" tetap muncul
//                 isLastQuestion={false}
//               />
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import SheepCharacter from '@/components/SheepCharacter';
import ProgressBar from '@/components/ProgressBar';
import SpeechBubble from '@/components/SpeechBubble';
import { useMemo, useRef, useState } from 'react';
import { QUESTIONS} from '../constants';
import {QUESTION_MAP, calculateTotalSteps, getFirstName, getNextQuestionId} from '../helper'
import type { QuestionId, Question, SubmitStatus } from '../types';
import QuestionForm from '@/components/QuestionForm';

type Answers = Record<string, string>;

export default function Home() {
  // Mulai dari pertanyaan pertama di array (bisa juga hardcode 'Nama Lengkap')
  const firstQuestionId = QUESTIONS[0].id as QuestionId;

  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionId | null>(firstQuestionId);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [history, setHistory] = useState<QuestionId[]>([]); // jejak pertanyaan yg sudah dilalui

  const isFinished = currentQuestionId === null;

  // Pertanyaan aktif (null kalau selesai)
  const currentQuestion: Question | null = useMemo(
    () => (currentQuestionId ? QUESTION_MAP[currentQuestionId] : null),
    [currentQuestionId]
  );

  const firstName = getFirstName(answers['Nama Lengkap'] || '');
  const currentQuestionText = currentQuestion?.text.replace(
    '{{firstName}}',
    firstName || 'kamu'
  );

  // Progress dinamis: langkah yang sudah dilewati (history) + pertanyaan aktif
  const totalSteps = calculateTotalSteps(answers);
  const currentStep = isFinished ? totalSteps : Math.min(history.length + 1, totalSteps);

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const submittingRef = useRef(false);

  async function submitToSheets(payload: Record<string, string>) {
    // cegah double submit (mis. fast re-render)
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      setSubmitStatus('submitting');
      setSubmitError('');

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload }),
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({} as any));
        throw new Error(e?.error || `Request failed with ${res.status}`);
      }

      setSubmitStatus('success');
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitError(err?.message || 'Unknown error');
      console.error('Submit error:', err);
    } finally {
      submittingRef.current = false;
    }

  }

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    if (currentAnswer.trim() === '') return;

    const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
    setAnswers(newAnswers);
    setCurrentAnswer('');

    const nextId = getNextQuestionId(currentQuestion.id as QuestionId, currentAnswer);

    // simpan jejak buat tombol Back
    setHistory((prev) => [...prev, currentQuestion.id as QuestionId]);

    if (nextId === null) {
      // flow selesai → submit ke Google Sheets
      submitToSheets(newAnswers);
    }

    setCurrentQuestionId(nextId);
  };

  const handlePreviousQuestion = () => {
    if (history.length === 0) return;

    // pop id terakhir dari history untuk kembali ke pertanyaan sebelumnya
    const prevHistory = [...history];
    const prevId = prevHistory.pop() as QuestionId;

    // ambil jawaban sebelumnya (jika ada) untuk prefilling
    const prevAnswer = answers[prevId] ?? '';

    setHistory(prevHistory);
    setCurrentQuestionId(prevId);
    setCurrentAnswer(prevAnswer);
  };

  const backgroundPatternUri = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgo8cGF0aCBkPSJNNCAyMEwzMCAyMEw0MCAzMEwzMCA0MEw0IDQwWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA0KSIvPgo8cGF0aCBkPSJNNjAgNEw4MCA0TDgwIDMwTDcwIDIwWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA0KSIvPgo8cGF0aCBkPSJNNjAgODBMOTAgOTBMOTAgNjBaIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDQpIi8+CjxjaXJjbGUgY3g9Ijg1IiBjeT0iNDUiIHI9IjUiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz4KPC9zdmc+')`;

  if (isFinished) {
    const finishedBackgroundStyle = {
      backgroundColor: '#ffedd5', // bg-orange-100
      backgroundImage: backgroundPatternUri,
    };
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans"
        style={finishedBackgroundStyle}
      >
        <div className="w-full max-w-2xl text-center bg-white p-8 border-4 border-black shadow-[10px_10px_0px_#000]">
          <h1 className="text-4xl md:text-5xl font-extrabold font-mono mb-4 text-green-600">
            ROOAARSOME!
          </h1>
          <p className="text-xl mb-6">Thanks for your answers.</p>

          {/* STATUS BANNER */}
          {submitStatus === 'submitting' && (
            <div className="mb-6 p-4 border-2 border-black bg-yellow-200 font-mono shadow-[4px_4px_0px_#000]">
              <span className="animate-pulse">Mengirim… mohon tunggu sebentar</span>
            </div>
          )}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 border-2 border-black bg-green-200 font-mono shadow-[4px_4px_0px_#000]">
              ✅ Berhasil terkirim 🎉
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 border-2 border-black bg-red-200 font-mono shadow-[4px_4px_0px_#000]">
              ❌ Gagal mengirim. {submitError ? `(${submitError})` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  const surveyBackgroundStyle = {
    backgroundColor: '#bae6fd', // bg-blue-200
    backgroundImage: backgroundPatternUri,
  };

  // ganti container terluar & main layout classnames jadi mobile-first
  return(
    <div
  className="min-h-dvh flex flex-col items-center justify-center px-[max(1rem,env(safe-area-inset-left))] py-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] font-sans"
  style={surveyBackgroundStyle}
>
  <div className="w-full max-w-6xl space-y-6 sm:space-y-8">
    <header className="px-1 sm:px-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-2 font-mono text-center">
        Welcome to Sheepy Survey
      </h1>
      <div className="sticky top-[env(safe-area-inset-top)] z-10">
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>
    </header>

    <main
  className="
    w-full
    grid grid-cols-1 md:grid-cols-12
    gap-4 sm:gap-8

    /* ⬇️ bikin area main cukup tinggi agar bisa center vertikal */
    min-h-[45vh] md:min-h-[50vh]

    /* ⬇️ center-kan item di kedua sumbu pada desktop */
    md:place-items-center
  "
>
  {/* Kiri: karakter */}
  <div className="md:col-span-4 flex justify-center md:justify-start">
    <SheepCharacter className="self-center" />
  </div>

  {/* Kanan: bubble + form */}
  <div
    className="
      w-full md:col-span-8
      flex flex-col gap-4 md:gap-6

      /* ⬇️ pusatkan vertikal & horizontal */
      justify-center
      items-center

      /* ⬇️ batasi lebar nyaman agar tampak center */
      max-w-[min(92vw,900px)]
    "
  >
    {currentQuestion && (
      <SpeechBubble text={currentQuestionText ?? currentQuestion.text} />
    )}
    {currentQuestion && (
      <QuestionForm
        question={currentQuestion}
        value={currentAnswer}
        onChange={setCurrentAnswer}
        onSubmit={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        questionIndex={history.length}
        isLastQuestion={false}
      />
    )}
  </div>
</main>

  </div>
</div>
  )
}
