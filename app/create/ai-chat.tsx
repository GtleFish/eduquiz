// Converted from: TroLyAi.tsx — AI Assistant chat interface
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface QuizQuestion {
  num: number;
  type: 'multiple' | 'short';
  question: string;
  answer: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'user', text: 'Math quiz on Geometry' },
];

const AI_QUESTIONS: QuizQuestion[] = [
  {
    num: 1, type: 'multiple',
    question: 'What is the sum of interior angles in a regular pentagon?',
    answer: 'B. 540° (Correct)',
  },
  {
    num: 2, type: 'short',
    question: 'Calculate the area of a circle with a radius of 7 units. (Use π= 22/7)',
    answer: 'Answer: 154 square units',
  },
];

export default function AiChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text: input.trim() }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "I've generated more questions based on your request!",
      }]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>AI Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishBtn} onPress={() => router.push(Routes.CREATE_LIST)}>
          <Text style={styles.publishBtnText}>Publish</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
        {/* User message */}
        <View style={styles.userMsgWrapper}>
          <View style={styles.userMsg}>
            <Text style={styles.userMsgTime}>10:42 AM</Text>
            <Text style={styles.userMsgText}>Math quiz on Geometry</Text>
          </View>
        </View>

        {/* AI response */}
        <View style={styles.aiMsgWrapper}>
          <View style={styles.aiMsg}>
            <Text style={styles.aiMsgText}>
              I've generated some geometry questions for you. Review the list below to build your quiz!
            </Text>

            {AI_QUESTIONS.map((q) => (
              <View key={q.num} style={[styles.questionCard, q.num === 1 ? styles.questionCardSelected : styles.questionCardNormal]}>
                <View style={styles.questionBadge}>
                  <Text style={styles.questionBadgeText}>Question {q.num}</Text>
                </View>
                {q.type === 'short' && (
                  <View style={styles.shortAnswerBadge}>
                    <Text style={styles.shortAnswerBadgeText}>Short Answer</Text>
                  </View>
                )}
                <Text style={styles.questionText}>{q.question}</Text>
                <View style={styles.answerBlock}>
                  <Text style={[styles.answerText, q.type === 'multiple' && styles.answerCorrect]}>{q.answer}</Text>
                </View>
                <View style={styles.questionActions}>
                  <TouchableOpacity style={styles.actionBtnStar}><Text style={styles.actionBtnText}>⭐ STA</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnSkip}><Text style={styles.actionBtnText}>❌ BỎ QUA</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnAccept}><Text style={styles.actionBtnText}>✓ CHẤP NHẬN</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputArea}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachBtn}><Text style={styles.attachIcon}>📎</Text></TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Ask for more questions or edits..."
            placeholderTextColor={Colors.textMuted}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendIcon}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom nav */}
        <View style={styles.bottomNav}>
          {[
            { icon: '📚', label: 'Templates' },
            { icon: '📄', label: 'Import' },
            { icon: '🤖', label: 'AI Assist', active: true },
            { icon: '⚙️', label: 'Settings' },
          ].map((tab) => (
            <TouchableOpacity key={tab.label} style={[styles.navTab, tab.active && styles.navTabActive]}>
              <Text style={styles.navIcon}>{tab.icon}</Text>
              <Text style={[styles.navLabel, tab.active && styles.navLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    backgroundColor: 'rgba(243,232,255,0.7)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  publishBtn: { backgroundColor: Colors.primaryLight, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs },
  publishBtnText: { fontSize: 14, fontWeight: '600', color: Colors.white },
  messages: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 160 },
  userMsgWrapper: { alignItems: 'flex-end' },
  userMsg: { backgroundColor: Colors.primary, borderRadius: 28, borderTopRightRadius: 8, padding: Spacing.xl, maxWidth: '80%' },
  userMsgTime: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: Spacing.xs },
  userMsgText: { fontSize: 15, fontWeight: '500', color: Colors.white },
  aiMsgWrapper: { alignItems: 'flex-start' },
  aiMsg: { backgroundColor: Colors.primarySurface, borderRadius: 28, borderTopLeftRadius: 8, padding: Spacing.xl, maxWidth: '90%', gap: Spacing.md },
  aiMsgText: { fontSize: 14, color: Colors.textPrimary, lineHeight: 22 },
  questionCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md },
  questionCardSelected: { backgroundColor: Colors.white, borderLeftWidth: 4, borderLeftColor: Colors.primary },
  questionCardNormal: { backgroundColor: Colors.white, borderLeftWidth: 4, borderLeftColor: Colors.primaryMuted },
  questionBadge: { backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, alignSelf: 'flex-start' },
  questionBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase' },
  shortAnswerBadge: { backgroundColor: Colors.primarySurface, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs, alignSelf: 'flex-start' },
  shortAnswerBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase' },
  questionText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, lineHeight: 22 },
  answerBlock: { backgroundColor: Colors.primarySurface, borderRadius: Radius.xl, padding: Spacing.md },
  answerText: { fontSize: 13, color: Colors.textSecondary },
  answerCorrect: { color: '#16a34a', fontWeight: '700' },
  questionActions: { flexDirection: 'row', gap: Spacing.sm },
  actionBtnStar: { backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs },
  actionBtnSkip: { backgroundColor: '#fee2e2', borderRadius: Radius.pill, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs },
  actionBtnAccept: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs },
  actionBtnText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
  inputArea: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.xl, gap: Spacing.md,
  },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.md },
  attachBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primarySurface, alignItems: 'center', justifyContent: 'center' },
  attachIcon: { fontSize: 22 },
  textInput: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, fontSize: 14, color: Colors.textPrimary, minHeight: 48 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendIcon: { fontSize: 18, color: Colors.white },
  bottomNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border },
  navTab: { alignItems: 'center', gap: 3, paddingHorizontal: Spacing.base },
  navTabActive: { backgroundColor: Colors.primaryLight, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 9, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  navLabelActive: { color: Colors.white },
});
