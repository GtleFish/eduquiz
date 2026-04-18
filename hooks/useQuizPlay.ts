import { useState, useCallback } from 'react';

export type AnswerState = 'idle' | 'correct' | 'wrong' | 'timesup';

interface UseQuizPlayOptions {
  totalQuestions: number;
  pointsPerCorrect?: number;
}

export function useQuizPlay({ totalQuestions, pointsPerCorrect = 100 }: UseQuizPlayOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const selectAnswer = useCallback((answerId: string, correctId: string) => {
    if (answerState !== 'idle') return;
    setSelected(answerId);
    const isCorrect = answerId === correctId;
    setAnswerState(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setScore((s) => s + pointsPerCorrect);
      setCorrectCount((c) => c + 1);
    }
  }, [answerState, pointsPerCorrect]);

  const timeUp = useCallback(() => {
    if (answerState === 'idle') setAnswerState('timesup');
  }, [answerState]);

  const nextQuestion = useCallback(() => {
    setSelected(null);
    setAnswerState('idle');
    setCurrentIndex((i) => Math.min(i + 1, totalQuestions - 1));
  }, [totalQuestions]);

  const isFinished = currentIndex >= totalQuestions - 1 && answerState !== 'idle';
  const accuracy = totalQuestions > 0
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  return {
    currentIndex,
    selected,
    answerState,
    score,
    correctCount,
    accuracy,
    isFinished,
    selectAnswer,
    timeUp,
    nextQuestion,
  };
}
