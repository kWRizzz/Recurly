import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from 'react'
import { router } from "expo-router";
import { userAuthStore } from "@/src/store/auth.store";
import { removeData } from "@/src/utils/storage.helper";
import { getNotes } from "@/src/services/notes.services";
import { getQuizHistory } from "@/src/services/notes.services";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const user = userAuthStore(state => state.user)
  const logout = userAuthStore(state => state.logout)
  
  const [stats, setStats] = useState({ totalNotes: 0, quizAttempts: 0, avgScore: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const notes = await getNotes();
      const history = await getQuizHistory();

      const totalNotes = notes?.length || 0;
      const quizAttempts = history?.length || 0;
      
      let avgScore = 0;
      if (quizAttempts > 0) {
        const totalPct = history.reduce((sum: number, item: any) => sum + (item.score / item.totalQuestions), 0);
        avgScore = Math.round((totalPct / quizAttempts) * 100);
      }

      setStats({ totalNotes, quizAttempts, avgScore });
    } catch (error) {
      console.log("Error loading profile stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await removeData();
    logout();
    router.replace(`/(auth)/signIn`)
  }

  return (
    <ScrollView className="flex-1 bg-[#09090b] px-6 pt-12" showsVerticalScrollIndicator={false}>
      <Text className="text-3xl font-extrabold mb-8 text-zinc-50">
        Profile
      </Text>

      {/* User Info Card */}
      <View className="bg-[#18181b] border border-zinc-800/80 p-6 rounded-2xl flex-row items-center mb-6">
        <View className="bg-violet-600/20 border border-violet-500/30 w-14 h-14 rounded-full justify-center items-center mr-4">
          <Text className="text-violet-400 font-bold text-2xl uppercase">
            {user?.name ? user.name.charAt(0) : "U"}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold text-zinc-100">
            {user?.name || "No Name"}
          </Text>
          <Text className="text-zinc-400 text-sm mt-0.5">
            {user?.email || "No Email"}
          </Text>
        </View>
      </View>

      {/* User Stats Section */}
      <Text className="text-zinc-400 font-bold text-sm uppercase tracking-wider mb-3">Study Progress</Text>
      
      {loading ? (
        <View className="bg-[#18181b] border border-zinc-800 p-8 rounded-2xl justify-center items-center mb-6">
          <ActivityIndicator size="small" color="#a78bfa" />
        </View>
      ) : (
        <View className="mb-6">
          {/* Grid Stats */}
          <View className="flex-row justify-between mb-4">
            <View className="bg-[#18181b] border border-zinc-800/80 p-5 rounded-2xl w-[48%] items-center">
              <View className="bg-indigo-950/40 p-2.5 rounded-full mb-2">
                <Ionicons name="document-text" size={20} color="#818cf8" />
              </View>
              <Text className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Notes</Text>
              <Text className="text-zinc-100 text-2xl font-black mt-1">{stats.totalNotes}</Text>
            </View>

            <View className="bg-[#18181b] border border-zinc-800/80 p-5 rounded-2xl w-[48%] items-center">
              <View className="bg-emerald-950/40 p-2.5 rounded-full mb-2">
                <Ionicons name="ribbon" size={20} color="#34d399" />
              </View>
              <Text className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Quizzes</Text>
              <Text className="text-zinc-100 text-2xl font-black mt-1">{stats.quizAttempts}</Text>
            </View>
          </View>

          {/* Average score stats */}
          <View className="bg-[#18181b] border border-zinc-800/80 p-5 rounded-2xl items-center flex-row justify-between">
            <View className="flex-row items-center">
              <View className="bg-violet-950/40 p-3 rounded-full mr-4">
                <Ionicons name="bar-chart" size={22} color="#a78bfa" />
              </View>
              <View>
                <Text className="text-zinc-100 font-bold text-base">Average Quiz Score</Text>
                <Text className="text-zinc-500 text-xs mt-0.5">Across all study materials</Text>
              </View>
            </View>
            <Text className="text-violet-400 text-3xl font-black">
              {stats.avgScore}%
            </Text>
          </View>
        </View>
      )}

      {/* Navigation Options */}
      <Text className="text-zinc-400 font-bold text-sm uppercase tracking-wider mb-3">General</Text>
      
      <TouchableOpacity
        onPress={() => router.push("/quizHistory/" as any)}
        className="bg-[#18181b] border border-zinc-800/80 p-4 rounded-2xl flex-row justify-between items-center mb-6 active:bg-zinc-800"
      >
        <View className="flex-row items-center">
          <Ionicons name="list" size={20} color="#a78bfa" className="mr-3" />
          <Text className="text-zinc-100 font-semibold text-base">View Quiz History</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#71717a" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-2xl active:bg-rose-950/40 flex-row justify-center items-center mb-12"
      >
        <Ionicons name="log-out" size={20} color="#f43f5e" className="mr-2" />
        <Text className="text-rose-400 text-center font-bold text-base">
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ProfileScreen