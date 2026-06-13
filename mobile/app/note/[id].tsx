import {
  router,
  useLocalSearchParams
} from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Note
} from "@/src/types/note.types";
import {
  getNotesById
} from "@/src/services/notes.services";
import { useEffect, useState } from "react";

export default function NoteDetail() {

  const { id } = useLocalSearchParams()

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const data = await getNotesById(
          id as string
        )
        setNote(data)
      } catch (error) {
        console.log(" error in fetching the notes" + error);
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()

  }, [])

  if (loading) {
    return (
      <Text>
        Loading...
      </Text>
    );
  }

  return (
    <View className="flex-1 p-6">
      <Text className="text-3xl font-bold">
        {note?.title}
      </Text>

      <View
        className="
    bg-gray-100
    p-4
    rounded-xl
    mt-6
  "
      >
        <Text className="text-lg font-semibold mb-2">
          Summary
        </Text>

        <Text>
          {note?.summary ||
            "No summary available"}
        </Text>
      </View>
      <TouchableOpacity
        className="
          bg-blue-500
          p-4
          rounded-xl
          mt-6
        "
      >
        <Text className="text-white text-center">
          View Summary
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={
          ()=>router.push(
            `/quiz/${id}`
          )
        }
        className="
          bg-green-500
          p-4
          rounded-xl
          mt-4
        "
      >
        <Text
          className="text-white text-center"
        >
          Generate Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>router.push(
          `/chat/${id}`
        )}
        className="
          bg-purple-500
          p-4
          rounded-xl
          mt-4
        "
      >
        <Text
          className="text-white text-center"
        >
          Chat With Notes
        </Text>
      </TouchableOpacity>
    </View>
  );
}