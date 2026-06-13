import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { userAuthStore } from "@/src/store/auth.store";
import { Note } from "@/src/types/note.types";
import { getNotes } from "@/src/services/notes.services";
import { router } from "expo-router";

export default function App() {
  const user = userAuthStore(state => state.user);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View className="flex-1 bg-[#09090b] p-6 pt-12">
      <Text className="text-zinc-400 text-lg">
        👋 Welcome,
      </Text>

      <Text className="text-3xl font-extrabold mt-1 text-zinc-50">
        {user?.name || "Learner"}
      </Text>

      <View className="bg-violet-600 p-6 rounded-2xl mt-6 shadow-lg shadow-violet-950/50">
        <Text className="text-violet-200 text-sm font-semibold uppercase tracking-wider">
          Total Study Materials
        </Text>
        <Text className="text-white text-5xl font-black mt-2">
          {notes.length}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/upload")}
        className="bg-emerald-600 p-4 rounded-xl mt-6 active:bg-emerald-700 shadow-md shadow-emerald-950/20"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Upload New PDF
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-between items-center mt-8 mb-4">
        <Text className="text-xl font-bold text-zinc-100">
          Recent Notes
        </Text>
        {notes.length > 5 && (
          <TouchableOpacity onPress={() => router.push("/(tabs)/notes")}>
            <Text className="text-violet-400 font-semibold">View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <Text className="text-zinc-500 text-center mt-4">Loading notes...</Text>
      ) : notes.length === 0 ? (
        <View className="bg-[#18181b] border border-zinc-800 p-6 rounded-2xl items-center">
          <Text className="text-zinc-400 text-center font-medium">No study materials uploaded yet.</Text>
          <Text className="text-zinc-500 text-center text-sm mt-2">Upload a PDF to generate AI summaries and quizzes!</Text>
        </View>
      ) : (
        <FlatList
          data={notes.slice(0, 5)}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/note/${item._id}`)}
              className="bg-[#18181b] border border-zinc-800/80 p-4 rounded-xl mb-3 active:bg-zinc-800"
            >
              <Text className="font-semibold text-zinc-100 text-base" numberOfLines={1}>
                {item.title}
              </Text>
              {item.summary ? (
                <Text className="text-zinc-400 text-sm mt-1" numberOfLines={2}>
                  {item.summary}
                </Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}