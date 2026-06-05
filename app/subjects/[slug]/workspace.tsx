"use client";

import { useMemo, useState } from "react";
import type { Question, Subject } from "@/types/flash-card";

type QuizState = "start" | "quiz" | "completed";

type AnswerRecord = {
  selectedOptionIndex: number;
  isCorrect?: boolean;
};

type FlashCardWorkspaceProps = {
  subject: Subject;
  questions: Question[];
};

export default function FlashCardWorkspace({
  subject,
  questions,
}: FlashCardWorkspaceProps) {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const cards = useMemo(() => {
    return questions;
  }, [questions]);

  const currentCard = cards[currentCardIndex];

  const handleStartQuiz = () => {
    setQuizState("quiz");
    setCurrentCardIndex(0);
    setAnswers([]);
    setSelectedOptionIndex(null);
  };
  console.log('quizState', quizState);
  const handleSelectOption = (optionIndex: number) => {
    if (selectedOptionIndex !== null) return;

    const option = currentCard?.options[optionIndex];
    if (!option) return;

    setSelectedOptionIndex(optionIndex);

    const isCorrect = option.is_correct ?? undefined;
    setAnswers((prev) => [
      ...prev,
      {
        selectedOptionIndex: optionIndex,
        isCorrect: isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentCardIndex + 1 < cards.length) {
      setCurrentCardIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setQuizState("completed");
    }
  };

  const handleRetakeQuiz = () => {
    setQuizState("start");
    setCurrentCardIndex(0);
    setAnswers([]);
    setSelectedOptionIndex(null);
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = cards.length;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="flex flex-col gap-5">
      {quizState === "start" && (
        <div className="flex flex-col items-center justify-center gap-6 border border-[#ded6cb] bg-white px-5 py-16 sm:px-8 lg:px-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-[#172026]">{subject.name}</h2>
            <p className="mt-3 text-base text-[#66737a]">
              {cards.length} câu hỏi trắc nghiệm - Mỗi câu chỉ có một đáp án đúng
            </p>
          </div>
          <button
            onClick={handleStartQuiz}
            className="h-12 bg-[#172026] px-8 text-base font-semibold text-white hover:bg-[#2c3a42]"
          >
            Bắt đầu bài thi
          </button>
        </div>
      )}

      {quizState === "quiz" && currentCard && (
        <div className="flex flex-col gap-2 min-h-screen justify-center">
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 right-0 border-b border-[#e0e0e0] bg-white p-1 z-10 shadow-sm">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#666]">
                  Câu {currentCardIndex + 1} / {cards.length}
                </span>
                <span className="text-sm font-semibold text-[#4caf50]">
                  ✓ {answers.filter((a) => a.isCorrect).length} câu đúng
                </span>
              </div>
              <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4caf50] transition-all duration-300"
                  style={{
                    width: `${((currentCardIndex + 1) / cards.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Question Card - Centered */}
          <div className="flex flex-col items-center  flex-1 px-5 pb-10">
            <div className="w-full max-w-2xl">
   {/* Question */}
              <div className="bg-white rounded-lg p-2 mb-2 shadow-md">
                <h3 className="text-2xl font-bold text-[#1a1a1a] leading-snug text-center">
                  {`Câu hỏi: ${currentCard.question}`}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentCard.options.map((option, index) => {
                  const isSelected = selectedOptionIndex === index;
                  const isAnsweredThisQuestion = selectedOptionIndex !== null;
                  const isCorrectOption = option.is_correct;

                  let bgColor = "bg-white hover:bg-[#f5f5f5]";
                  let borderColor = "border-[#e0e0e0]";
                  let textColor = "text-[#333]";

                  if (isAnsweredThisQuestion) {
                    if (isSelected) {
                      if (isCorrectOption) {
                        bgColor = "bg-[#e8f5e9]";
                        borderColor = "border-[#4caf50]";
                        textColor = "text-[#2e7d32]";
                      } else {
                        bgColor = "bg-[#ffebee]";
                        borderColor = "border-[#f44336]";
                        textColor = "text-[#c62828]";
                      }
                    } else if (isCorrectOption) {
                      bgColor = "bg-[#e8f5e9]";
                      borderColor = "border-[#4caf50]";
                      textColor = "text-[#2e7d32]";
                    } else {
                      bgColor = "bg-[#f5f5f5] opacity-60";
                      borderColor = "border-[#e0e0e0]";
                    }
                  }

                  return (
                    <button
                      id={`option-${index}`}
                      key={`option-${index}`}
                      onClick={() => handleSelectOption(index)}
                      disabled={isAnsweredThisQuestion}
                      className={`w-full border-2 ${borderColor} ${bgColor} ${textColor} p-4 rounded-lg transition text-left font-semibold text-lg flex items-center justify-between group`}
                    >
                      <span className="flex-1">{option.text}</span>
                      {isAnsweredThisQuestion && (
                        <span className="text-2xl font-bold ml-4 flex-shrink-0">
                          {isSelected && isCorrectOption && "✓"}
                          {isSelected && !isCorrectOption && "✗"}
                          {!isSelected && isCorrectOption && "✓"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {selectedOptionIndex !== null && (
                <div
                  className={`mb-8 p-5 rounded-lg text-center font-semibold text-lg ${
                    answers[answers.length - 1]?.isCorrect
                      ? "bg-[#e8f5e9] text-[#2e7d32]"
                      : "bg-[#ffebee] text-[#c62828]"
                  }`}
                >
                  {answers[answers.length - 1]?.isCorrect
                    ? "🎉 Chính xác!"
                    : "❌ Sai rồi! Hãy cố gắng lần sau."}
                </div>
              )}

              {/* Next Button */}
              {selectedOptionIndex !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full h-12 bg-[#2196f3] text-white font-semibold rounded-lg hover:bg-[#1976d2] transition text-lg"
                >
                  {currentCardIndex + 1 === cards.length ? "Xem kết quả" : "Tiếp tục"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {quizState === "completed" && (
        <div className="flex flex-col items-center justify-center gap-6 border border-[#ded6cb] bg-white px-5 py-16 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#55736b]">
              Bài thi kết thúc
            </p>
            <h2 className="mt-4 text-5xl font-bold text-[#172026]">{percentage}%</h2>
            <p className="mt-2 text-lg text-[#66737a]">
              Bạn trả lời đúng <span className="font-semibold text-[#172026]">{correctCount}</span> / {totalQuestions} câu
            </p>
          </div>

          <div className="w-full max-w-xs space-y-3">
            <div className="border border-[#ded6cb] bg-[#f7f4ef] p-4 text-center rounded">
              <p className="text-2xl font-semibold text-[#172026]">
                {percentage >= 80
                  ? "🌟 Tuyệt vời!"
                  : percentage >= 60
                    ? "👍 Tốt"
                    : "📚 Cần ôn tập thêm"}
              </p>
            </div>
          </div>

          <button
            onClick={handleRetakeQuiz}
            className="h-12 bg-[#172026] px-8 text-base font-semibold text-white hover:bg-[#2c3a42]"
          >
            Làm lại bài thi
          </button>
        </div>
      )}
    </div>
  );
}
