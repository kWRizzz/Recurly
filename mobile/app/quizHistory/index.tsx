import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"
import { getQuizHistory } from "@/src/services/notes.services"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

interface Attempt {
  _id: string;
  noteTitle: string;
  score: number;
  totalQuestions: number;
  createdAt: string;
}

const QuizHistoryScreen = () => {
  const [history, setHistory] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getQuizHistory();
        setHistory(data || []);
      } catch (error) {
        console.log("Error fetching quiz history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number, total: number) => {
    const percent = (score / total) * 100;
    if (percent >= 80) return "text-emerald-400 bg-emerald-950/30 border-emerald-900/40";
    if (percent >= 50) return "text-amber-400 bg-amber-950/30 border-amber-900/40";
    return "text-rose-400 bg-rose-950/30 border-rose-900/40";
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#09090b] justify-center items-center">
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text className="text-zinc-500 mt-4 font-medium">Loading history...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#09090b] px-6 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="bg-[#18181b] border border-zinc-800 p-2.5 rounded-full mr-4 active:bg-zinc-800">
          <Ionicons name="arrow-back" size={20} color="#f4f4f5" />
        </TouchableOpacity>
        <Text className="text-zinc-50 font-bold text-xl">Quiz History</Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20 px-8">
            <View className="bg-zinc-900 border border-zinc-800 p-6 rounded-full mb-4">
              <Ionicons name="ribbon-outline" size={40} color="#a78bfa" />
            </View>
            <Text className="text-zinc-200 font-bold text-xl text-center">No Quiz Attempts Yet</Text>
            <Text className="text-zinc-500 text-sm mt-2 text-center leading-relaxed">
              Generate a quiz for any note, answer the questions, and track your performance history here!
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          const percent = Math.round((item.score / item.totalQuestions) * 100);
          const badgeStyle = getScoreColor(item.score, item.totalQuestions);

          return (
            <View className="bg-[#18181b] border border-zinc-800/80 p-5 rounded-2xl mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-zinc-100 font-bold text-base flex-1 mr-3" numberOfLines={2}>
                  {item.noteTitle}
                </Text>
                <View className={`border px-3 py-1.5 rounded-xl ${badgeStyle}`}>
                  <Text className="font-extrabold text-sm">
                    {percent}%
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-zinc-900">
                <Text className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                  Score: {item.score} / {item.totalQuestions}
                </Text>
                <Text className="text-zinc-500 text-xs font-medium">
                  {formatDate(item.createdAt)}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

export default QuizHistoryScreen