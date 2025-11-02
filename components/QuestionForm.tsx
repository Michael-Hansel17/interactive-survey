// import React from 'react';
// import type { Question } from '../types';

// interface QuestionFormProps {
//   question: Question;
//   value: string;
//   onChange: (value: string) => void;
//   onSubmit: () => void;
//   onPrevious: () => void;
//   questionIndex: number;
//   isLastQuestion: boolean;
// }

// const QuestionForm: React.FC<QuestionFormProps> = ({ question, value, onChange, onSubmit, onPrevious, questionIndex, isLastQuestion }) => {
  
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       onSubmit();
//     }
//   };

//   return (
//     <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="w-full flex flex-col gap-4">
//       <input
//         type={question.type}
//         placeholder={question.placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyDown={handleKeyDown}
//         required
//         className="w-full text-lg p-4 bg-white border-2 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-yellow-400 font-mono shadow-[4px_4px_0px_#000]"
//         autoFocus
//       />
//       <div className={`flex flex-row gap-4 ${questionIndex > 0 ? 'justify-between' : 'justify-end'}`}>
//         {questionIndex > 0 && (
//           <button
//             type="button"
//             onClick={onPrevious}
//             className="w-full sm:w-auto shrink-0 text-lg font-bold bg-white text-black p-4 border-2 border-black rounded-none hover:bg-gray-100 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]"
//           >
//             &lt;- Prev
//           </button>
//         )}
//         <button
//           type="submit"
//           className="w-full sm:w-auto shrink-0 text-lg font-bold bg-yellow-400 text-black p-4 border-2 border-black rounded-none hover:bg-yellow-500 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]"
//         >
//           {isLastQuestion ? 'Finish!' : 'Next ->'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default QuestionForm;

// import React from 'react';
// import type { Question } from '../types';

// interface QuestionFormProps {
//   question: Question;
//   value: string;
//   onChange: (value: string) => void;
//   onSubmit: () => void;
//   onPrevious: () => void;
//   questionIndex: number;
//   isLastQuestion: boolean;
// }

// const QuestionForm: React.FC<QuestionFormProps> = ({
//   question,
//   value,
//   onChange,
//   onSubmit,
//   onPrevious,
//   questionIndex,
//   isLastQuestion,
// }) => {
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       onSubmit();
//     }
//   };

//   const handleOptionChange = (optionValue: string) => {
//     onChange(optionValue);
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSubmit();
//       }}
//       className="w-full flex flex-col gap-4"
//     >
//       {question.type === 'text' && (
//         <input
//           type="text"
//           placeholder={question.placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           onKeyDown={handleKeyDown}
//           required={question.required}
//           className="w-full text-lg p-4 bg-white border-2 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-yellow-400 font-mono shadow-[4px_4px_0px_#000]"
//           autoFocus
//         />
//       )}

//       {question.type === 'choice' && question.options && (
//         <div className="flex flex-col gap-3">
//           {question.options.map((opt) => (
//             <label
//               key={opt.value}
//               className={`flex items-center gap-3 p-3 border-2 border-black bg-white cursor-pointer font-mono text-lg shadow-[3px_3px_0px_#000] hover:bg-yellow-100 transition-all ${
//                 value === opt.value ? 'bg-yellow-200' : ''
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={question.id}
//                 value={opt.value}
//                 checked={value === opt.value}
//                 onChange={() => handleOptionChange(opt.value)}
//                 className="w-5 h-5 accent-yellow-400"
//               />
//               <span>{opt.label}</span>
//             </label>
//           ))}
//         </div>
//       )}

//       <div
//         className={`flex flex-row gap-4 ${
//           questionIndex > 0 ? 'justify-between' : 'justify-end'
//         }`}
//       >
//         {questionIndex > 0 && (
//           <button
//             type="button"
//             onClick={onPrevious}
//             className="w-full sm:w-auto shrink-0 text-lg font-bold bg-white text-black p-4 border-2 border-black rounded-none hover:bg-gray-100 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]"
//           >
//             &lt;- Prev
//           </button>
//         )}
//         <button
//           type="submit"
//           className="w-full sm:w-auto shrink-0 text-lg font-bold bg-yellow-400 text-black p-4 border-2 border-black rounded-none hover:bg-yellow-500 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]"
//         >
//           {isLastQuestion ? 'Finish!' : 'Next ->'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default QuestionForm;

import React, { useRef } from 'react';
import type { Question } from '../types';

interface QuestionFormProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;        // tetap sama, kita panggil via native submit
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

  // Enter => minta browser submit (agar pattern/required tervalidasi)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  // Submit native => cek validitas lalu panggil onSubmit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    onSubmit();
  };

  // PILIH OPSI: set value -> submit otomatis (native)
  const handleOptionPick = (optionValue: string) => {
    onChange(optionValue);
    // Pastikan state 'value' sudah ter-update dulu
    setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 0);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      className="w-full flex flex-col gap-4 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
      noValidate={false}
    >
      {question.type === 'text' && (
        <input
          type="text"
          placeholder={question.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          required={question.required}
          {...(question.inputProps || {})}
          className="w-full text-lg sm:text-xl p-4 sm:p-5 bg-white border-2 border-black rounded-lg sm:rounded-none focus:outline-none focus:ring-4 focus:ring-yellow-400 font-mono shadow-[4px_4px_0px_#000]"
          autoFocus
        />
      )}

      {question.type === 'choice' && question.options && (
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3 border-2 border-black bg-white cursor-pointer font-mono text-lg shadow-[3px_3px_0px_#000] hover:bg-yellow-100 transition-all ${
                value === opt.value ? 'bg-yellow-200' : ''
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => handleOptionPick(opt.value)}
                className="w-5 h-5 accent-yellow-400"
                required={question.required}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      <div className={`
        flex gap-3
        ${questionIndex > 0 ? 'justify-between' : 'justify-end'}
        sm:static sm:mt-0
        fixed left-0 right-0 bottom-0 z-20
        
      `}
    >
        {questionIndex > 0 && (
          <button
            type="button"
            onClick={onPrevious}
            className="flex-1 text-base sm:text-lg font-bold bg-white text-black p-4 border-2 border-black rounded-lg sm:rounded-none hover:bg-gray-100 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]"
          >
            &lt;- Prev
          </button>
        )}
        <button
          type="submit"
          className={`flex-1 text-base sm:text-lg font-bold bg-yellow-400 text-black p-4 border-2 border-black rounded-lg sm:rounded-none hover:bg-yellow-500 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]`}
        >
          {isLastQuestion ? 'Finish!' : 'Next ->'}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;