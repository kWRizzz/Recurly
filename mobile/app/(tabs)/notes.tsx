import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import React, {
  useEffect,
  useState
} from 'react'
import { Note } from "@/src/types/note.types";
import { getNotes } from "@/src/services/notes.services";
import NoteCard from '@/src/components/notes/NoteCard';
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const NotesScreen = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const data = await getNotes()
      setNotes(data || [])
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className='flex-1 p-6 pt-12 bg-[#09090b]'>
      <Text className='text-3xl font-bold mb-6 text-zinc-50'>
        My Notes
      </Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-[#18181b] border border-zinc-800/80 rounded-xl px-4 py-3.5 mb-6">
        <Ionicons name="search" size={18} color="#71717a" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search study materials..."
          placeholderTextColor="#71717a"
          className="flex-1 text-zinc-100 ml-2 text-base"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color="#71717a" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#a78bfa" />
        </View>
      ) : filteredNotes.length === 0 ? (
        <View className="flex-1 justify-center items-center py-20 px-8">
          <View className="bg-zinc-900 border border-zinc-800 p-6 rounded-full mb-4">
            <Ionicons name="document-text-outline" size={40} color="#a78bfa" />
          </View>
          <Text className="text-zinc-200 font-bold text-xl text-center">
            {searchQuery.length > 0 ? "No Match Found" : "No Notes Yet"}
          </Text>
          <Text className="text-zinc-500 text-sm mt-2 text-center leading-relaxed">
            {searchQuery.length > 0 
              ? "We couldn't find any documents matching your search term."
              : "Upload a PDF document to start study material summarization."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => router.push(`/note/${item._id}`)}
            />
          )}
        />
      )}
    </View>
  )
}

export default NotesScreen