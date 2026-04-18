// ============================================================
// Typed route constants for Expo Router
// ============================================================
export const Routes = {
  // ── Auth ────────────────────────────────────────────────
  ONBOARDING: '/(auth)/onboarding' as const,
  GET_STARTED: '/(auth)/get-started' as const,
  LOGIN: '/(auth)/login' as const,
  REGISTER: '/(auth)/register' as const,
  FORGOT_PASSWORD: '/(auth)/forgot-password' as const,
  RESET_PASSWORD: '/(auth)/reset-password' as const,
  OTP_VERIFY: '/(auth)/otp-verify' as const,
  LEARNING_PREFS: '/(auth)/learning-preferences' as const,
  PIN_CODE: '/(auth)/pin-code' as const,
  SUCCESS: '/(auth)/success' as const,

  // ── Tabs (root) ─────────────────────────────────────────
  HOME: '/(tabs)/' as const,
  EXPLORE: '/(tabs)/explore' as const,
  LEADERBOARD: '/(tabs)/leaderboard' as const,
  PROFILE: '/(tabs)/profile' as const,

  // ── Quiz flow ────────────────────────────────────────────
  QUIZ_LOBBY: '/quiz/lobby' as const,
  QUIZ_READY: '/quiz/ready' as const,
  QUIZ_COMPLETE: '/quiz/complete' as const,

  // Quiz play types
  PLAY_MULTIPLE_CHOICE: '/quiz/play/multiple-choice' as const,
  PLAY_TRUE_FALSE: '/quiz/play/true-false' as const,
  PLAY_FILL_BLANK: '/quiz/play/fill-blank' as const,
  PLAY_MATCH_PAIRS: '/quiz/play/match-pairs' as const,
  PLAY_ARRANGE_ORDER: '/quiz/play/arrange-order' as const,
  PLAY_MULTIPLE_SELECT: '/quiz/play/multiple-select' as const,
  PLAY_IMAGE_QUESTION: '/quiz/play/image-question' as const,
  PLAY_AUDIO_QUESTION: '/quiz/play/audio-question' as const,

  // Quiz feedback
  FEEDBACK_CORRECT: '/quiz/feedback/correct' as const,
  FEEDBACK_WRONG: '/quiz/feedback/wrong' as const,
  FEEDBACK_TIMESUP: '/quiz/feedback/times-up' as const,

  // Quiz results
  RESULTS_DETAIL: '/quiz/results/detail' as const,
  RESULTS_SHARE: '/quiz/results/share' as const,
  RESULTS_ACHIEVEMENT: '/quiz/results/achievement' as const,
  RESULTS_NEXT: '/quiz/results/next-options' as const,

  // ── Create flow ──────────────────────────────────────────
  CREATE_NEW: '/create/new' as const,
  CREATE_QUESTION_TYPE: '/create/question-type' as const,
  CREATE_EDITOR: '/create/question-editor' as const,
  CREATE_ANSWER: '/create/answer-setup' as const,
  CREATE_INFO: '/create/quiz-info' as const,
  CREATE_LIST: '/create/question-list' as const,
  CREATE_PUBLISH: '/create/publish-settings' as const,
  CREATE_AI: '/create/ai-generate' as const,
  CREATE_AI_CHAT: '/create/ai-chat' as const,

  // ── Live battle ──────────────────────────────────────────
  LIVE_BATTLE_JOIN: '/live-battle/join' as const,
  LIVE_BATTLE_SETUP: '/live-battle/setup' as const,
  LIVE_BATTLE_VICTORY: '/live-battle/victory' as const,

  // ── Classroom ────────────────────────────────────────────
  CLASSROOM: '/classroom/' as const,
  CLASSROOM_CREATE: '/classroom/create' as const,
  CLASSROOM_DETAIL: '/classroom/detail' as const,
  CLASSROOM_ASSIGN_QUIZ: '/classroom/assign-quiz' as const,

  // ── Profile ──────────────────────────────────────────────
  PROFILE_EDIT: '/profile/edit' as const,
  PROFILE_SECURITY: '/profile/security' as const,
  PROFILE_SETTINGS: '/profile/settings' as const,
  PROFILE_HISTORY: '/profile/history' as const,
  PROFILE_STREAK: '/profile/streak' as const,
  PROFILE_REPORT: '/profile/weekly-report' as const,
  PROFILE_ANALYSIS: '/profile/analysis' as const,
  PROFILE_COLLECTION: '/profile/collection' as const,
  PROFILE_PROGRESS: '/profile/progress' as const,
  PROFILE_RATING: '/profile/rating' as const,
  PROFILE_NOTIFICATIONS: '/profile/notifications' as const,

  // ── Leaderboard ──────────────────────────────────────────
  LEADERBOARD_FRIENDS: '/leaderboard/friends' as const,
  LEADERBOARD_WORLD: '/leaderboard/world' as const,

  // ── Search ───────────────────────────────────────────────
  SEARCH: '/search/' as const,
};
