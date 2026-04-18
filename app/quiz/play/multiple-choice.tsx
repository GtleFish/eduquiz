// Converted from: src/app/components/MultipleChoice.tsx
// Uses QuizSessionStore so each visit shows the next question
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';
import { TimerBadge } from '../../../components/quiz/TimerBadge';
import { OptionCard, Option } from '../../../components/quiz/OptionCard';
import { useCountdown } from '../../../hooks/useCountdown';
import { QuizSessionStore } from '../../../store/quizSessionStore';

const OPTION_COLORS = ['#3b82f6', Colors.primary, '#22c55e', '#eab308'];

export default function MultipleChoiceScreen() {
  const router = useRouter();

  // Read current question from store on every focus (handles "next question")
  const [question, setQuestion] = useState(() => QuizSessionStore.getCurrentQuestion());
  const [progress, setProgress] = useState(() => QuizSessionStore.getProgress());
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong' | 'timesup'>('idle');

  const { seconds, isExpired, start, reset } = useCountdown(question?.timeLimit ?? 15);

  // Re-read question every time this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const q = QuizSessionStore.getCurrentQuestion();
      const p = QuizSessionStore.getProgress();
      setQuestion(q);
      setProgress(p);
      setSelected(null);
      setAnswerState('idle');
      reset();
      // Small delay so reset completes before starting
      const t = setTimeout(() => start(), 50);
      return () => clearTimeout(t);
    }, [])
  );

  // Auto time-up
  useEffect(() => {
    if (isExpired && answerState === 'idle') {
      QuizSessionStore.recordTimeUp();
      setAnswerState('timesup');
    }
  }, [isExpired, answerState]);

  const handleSelect = (optionId: string) => {
    if (answerState !== 'idle' || !question) return;
    setSelected(optionId);
    const result = QuizSessionStore.recordAnswer(optionId);
    setAnswerState(result);
    setProgress(QuizSessionStore.getProgress());
  };

  const handleNext = () => {
    const feedbackRoute =
      answerState === 'correct' ? Routes.FEEDBACK_CORRECT :
      answerState === 'wrong'   ? Routes.FEEDBACK_WRONG :
                                  Routes.FEEDBACK_TIMESUP;

    // Check if quiz is finished
    if (QuizSessionStore.isLastQuestion()) {
      // Go to results after feedback
      router.push({ pathname: feedbackRoute, params: { isLast: '1' } } as any);
    } else {
      QuizSessionStore.next();
      router.push(feedbackRoute as any);
    }
  };

  const handleClose = () => {
    Alert.alert(
      'Thoát quiz?',
      'Tiến trình sẽ không được lưu.',
      [
        { text: 'Tiếp tục chơi', style: 'cancel' },
        { text: 'Thoát', style: 'destructive', onPress: () => router.replace(Routes.HOME) },
      ]
    );
  };

  const getOptionState = (id: string) => {
    if (!question) return 'idle' as const;
    if (answerState === 'idle') return selected === id ? 'selected' : 'idle';
    if (id === question.correctId) return 'correct';
    if (id === selected && selected !== question.correctId) return 'wrong';
    return 'disabled';
  };

  if (!question) {
    return (
      <View style={styles.screen}>
        <Text style={{ padding: 24, color: Colors.primary }}>Không có câu hỏi.</Text>
      </View>
    );
  }

  // Build Option objects from question data
  const options: Option[] = question.options.map((opt, i) => ({
    id: opt.id,
    label: (['A', 'B', 'C', 'D'] as const)[i],
    text: opt.text,
    color: OPTION_COLORS[i] ?? Colors.primary,
  }));

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={progress.current}
        total={progress.total}
        points={progress.score}
        onClose={handleClose}
        onMore={() => {}}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TimerBadge seconds={seconds} />

        {/* Question */}
        <View style={styles.questionBlock}>
          <Text style={styles.questionText}>{question.question}</Text>
          <View style={styles.underline} />
        </View>

        {/* Options */}
        <View style={styles.optionsList}>
          {options.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              state={getOptionState(opt.id)}
              onPress={() => handleSelect(opt.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.hintBtn}>
          <Text style={styles.hintIcon}>💡</Text>
        </TouchableOpacity>

        {answerState !== 'idle' && (
          <TouchableOpacity
            style={[
              styles.nextBtn,
              answerState === 'correct' && styles.nextBtnCorrect,
              answerState === 'wrong'   && styles.nextBtnWrong,
              answerState === 'timesup' && styles.nextBtnTimesup,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>
              {answerState === 'correct' ? '✓  Tiếp tục →' :
               answerState === 'wrong'   ? '✗  Xem giải thích →' :
                                           '⏱  Câu tiếp theo →'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  content: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 120 },
  questionBlock: { alignItems: 'center', gap: Spacing.md },
  questionText: {
    fontSize: 24, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', lineHeight: 34,
  },
  underline: {
    width: 80, height: 4, borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
  optionsList: { gap: Spacing.md },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: 34, paddingTop: Spacing.base,
    backgroundColor: Colors.primaryBg,
  },
  hintBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  hintIcon: { fontSize: 22 },
  nextBtn: {
    flex: 1, marginLeft: Spacing.base,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  nextBtnCorrect: { backgroundColor: '#16a34a' },
  nextBtnWrong:   { backgroundColor: '#dc2626' },
  nextBtnTimesup: { backgroundColor: '#d97706' },
  nextBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
});
