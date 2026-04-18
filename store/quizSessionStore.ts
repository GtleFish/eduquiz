// Quiz session store — holds state across question screens
// Module-level singleton — no Zustand/Redux needed for this scope

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  timeLimit: number;       // seconds
  explanation?: string;    // shown on wrong/timesup feedback
}

export interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  correctCount: number;
  answers: Record<string, 'correct' | 'wrong' | 'timesup'>;
  // Snapshot of the question that was just answered — used by feedback screens
  lastAnsweredQuestion: QuizQuestion | null;
  lastAnsweredId: string | null;
}

// ─── Sample data ─────────────────────────────────────────────────────────────
export const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Thành phần nào chiếm tỉ lệ lớn nhất trong khí quyển Trái Đất?',
    options: [
      { id: 'a', text: 'Oxy' },
      { id: 'b', text: 'Nitơ' },
      { id: 'c', text: 'Argon' },
      { id: 'd', text: 'Cacbonic' },
    ],
    correctId: 'b',
    timeLimit: 15,
    explanation: 'Nitơ (N₂) chiếm khoảng 78% khí quyển Trái Đất, trong khi Oxy chỉ chiếm khoảng 21%.',
  },
  {
    id: 'q2',
    question: 'Thành phố nào được mệnh danh là "Kinh đô Ánh sáng"?',
    options: [
      { id: 'a', text: 'Luân Đôn' },
      { id: 'b', text: 'New York' },
      { id: 'c', text: 'Paris' },
      { id: 'd', text: 'Tokyo' },
    ],
    correctId: 'c',
    timeLimit: 15,
    explanation: 'Paris được gọi là "La Ville Lumière" vì là một trong những thành phố đầu tiên lắp đặt hệ thống chiếu sáng đường phố bằng gas vào thế kỷ 19.',
  },
  {
    id: 'q3',
    question: 'Nguyên tố nào có ký hiệu hóa học là "Au"?',
    options: [
      { id: 'a', text: 'Bạc' },
      { id: 'b', text: 'Đồng' },
      { id: 'c', text: 'Nhôm' },
      { id: 'd', text: 'Vàng' },
    ],
    correctId: 'd',
    timeLimit: 15,
    explanation: '"Au" xuất phát từ tiếng Latin "Aurum" có nghĩa là Vàng. Vàng có số nguyên tử 79.',
  },
  {
    id: 'q4',
    question: 'Ai là người đầu tiên đặt chân lên Mặt Trăng?',
    options: [
      { id: 'a', text: 'Buzz Aldrin' },
      { id: 'b', text: 'Neil Armstrong' },
      { id: 'c', text: 'Yuri Gagarin' },
      { id: 'd', text: 'John Glenn' },
    ],
    correctId: 'b',
    timeLimit: 15,
    explanation: 'Neil Armstrong đặt chân lên Mặt Trăng ngày 20/7/1969 trong sứ mệnh Apollo 11. Buzz Aldrin là người thứ hai.',
  },
  {
    id: 'q5',
    question: 'Sông nào dài nhất thế giới?',
    options: [
      { id: 'a', text: 'Amazon' },
      { id: 'b', text: 'Mississippi' },
      { id: 'c', text: 'Nile' },
      { id: 'd', text: 'Yangtze' },
    ],
    correctId: 'c',
    timeLimit: 15,
    explanation: 'Sông Nile dài khoảng 6.650 km, chảy qua 11 quốc gia châu Phi và đổ ra Địa Trung Hải.',
  },
];

// ─── Singleton ────────────────────────────────────────────────────────────────
let session: QuizSession = createSession(SAMPLE_QUESTIONS);

function createSession(questions: QuizQuestion[]): QuizSession {
  return {
    questions,
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    answers: {},
    lastAnsweredQuestion: null,
    lastAnsweredId: null,
  };
}

// ─── Store API ────────────────────────────────────────────────────────────────
export const QuizSessionStore = {
  start(questions: QuizQuestion[] = SAMPLE_QUESTIONS) {
    session = createSession(questions);
  },

  getCurrentQuestion(): QuizQuestion | null {
    return session.questions[session.currentIndex] ?? null;
  },

  getSession(): QuizSession {
    return { ...session };
  },

  /** Returns the question + selected answer that was just answered.
   *  Feedback screens use this — NOT getCurrentQuestion() which may
   *  already point to the next question after next() is called. */
  getLastAnswered(): { question: QuizQuestion; selectedId: string } | null {
    if (!session.lastAnsweredQuestion || !session.lastAnsweredId) return null;
    return {
      question: session.lastAnsweredQuestion,
      selectedId: session.lastAnsweredId,
    };
  },

  recordAnswer(answerId: string): 'correct' | 'wrong' {
    const q = session.questions[session.currentIndex];
    if (!q) return 'wrong';

    // Snapshot before advancing
    session.lastAnsweredQuestion = q;
    session.lastAnsweredId = answerId;

    const result: 'correct' | 'wrong' = answerId === q.correctId ? 'correct' : 'wrong';
    session.answers[q.id] = result;
    if (result === 'correct') {
      session.score += 100;
      session.correctCount += 1;
    }
    return result;
  },

  recordTimeUp() {
    const q = session.questions[session.currentIndex];
    if (!q) return;
    session.lastAnsweredQuestion = q;
    session.lastAnsweredId = null;
    session.answers[q.id] = 'timesup';
  },

  next(): boolean {
    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex += 1;
      return true;
    }
    return false;
  },

  isLastQuestion(): boolean {
    return session.currentIndex >= session.questions.length - 1;
  },

  getProgress() {
    return {
      current: session.currentIndex + 1,
      total: session.questions.length,
      score: session.score,
    };
  },

  getSummary() {
    return {
      score: session.score,
      correctCount: session.correctCount,
      total: session.questions.length,
      accuracy: session.questions.length > 0
        ? Math.round((session.correctCount / session.questions.length) * 100)
        : 0,
    };
  },
};
