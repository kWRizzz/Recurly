import {
  router,
  useLocalSearchParams
} from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Note } from "@/src/types/note.types";
import { getNotesById, deleteNote } from "@/src/services/notes.services";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NoteDetail() {
  const { id } = useLocalSearchParams()
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotesById(id as string)
        setNote(data)
      } catch (error) {
        console.log("error in fetching notes: " + error);
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  const handleDelete = async () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this study material?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteNote(id as string);
              router.back();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#09090b] justify-center items-center">
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text className="text-zinc-500 mt-4 font-medium">Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#09090b] px-6 pt-12" showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="bg-[#18181b] border border-zinc-800 p-2.5 rounded-full mr-4 active:bg-zinc-800">
          <Ionicons name="arrow-back" size={20} color="#f4f4f5" />
        </TouchableOpacity>
        <Text className="text-zinc-300 font-semibold text-lg">Back to Notes</Text>
      </View>

      <Text className="text-3xl font-extrabold text-zinc-50 leading-tight">
        {note?.title}
      </Text>

      {/* Content Card */}
      <View className="bg-[#18181b] border border-zinc-800/80 p-5 rounded-2xl mt-6">
        <Text className="text-lg font-bold text-zinc-100 mb-3">
          {showFullContent ? "Full Extracted Content" : "AI-Generated Summary"}
        </Text>

        <Text className="text-zinc-400 text-base leading-relaxed">
          {showFullContent
            ? (note?.content || "No content available")
            : (note?.summary || "No summary available")}
        </Text>
      </View>

      {/* Toggle View Mode */}
      <TouchableOpacity
        onPress={() => setShowFullContent(!showFullContent)}
        className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl mt-6 active:bg-zinc-800"
      >
        <Text className="text-zinc-300 text-center font-semibold">
          {showFullContent ? "View AI Summary" : "View Full Content"}
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View className="mt-8 mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/flashcard/${id}` as any)}
          className="bg-indigo-600 p-4 rounded-xl active:bg-indigo-700 flex-row justify-center items-center mb-4"
        >
          <Ionicons name="albums" size={20} color="white" className="mr-2" />
          <Text className="text-white text-center font-bold text-lg">
            Practice Flashcards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(`/quiz/${id}`)}
          className="bg-emerald-600 p-4 rounded-xl active:bg-emerald-700 flex-row justify-center items-center mb-4"
        >
          <Ionicons name="school" size={20} color="white" className="mr-2" />
          <Text className="text-white text-center font-bold text-lg">
            Generate Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(`/chat/${id}`)}
          className="bg-violet-600 p-4 rounded-xl active:bg-violet-700 flex-row justify-center items-center mb-4"
        >
          <Ionicons name="chatbubbles" size={20} color="white" className="mr-2" />
          <Text className="text-white text-center font-bold text-lg">
            Chat With Notes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl active:bg-rose-950/40 flex-row justify-center items-center"
        >
          <Ionicons name="trash" size={20} color="#f43f5e" className="mr-2" />
          <Text className="text-rose-400 text-center font-bold text-lg">
            Delete Note
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}