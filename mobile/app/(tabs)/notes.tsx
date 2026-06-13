import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import React, {
  useEffect,
  useState
} from 'react'

import {
  Note
} from "@/src/types/note.types";
import {
  getNotes,
  uploadPdf
} from "@/src/services/notes.services";
import NoteCard from '@/src/components/notes/NoteCard';
import {
  router,
  useLocalSearchParams
} from "expo-router"

import { 
  deleteNote
 } from "@/src/services/notes.services";

const notes = () => {

  const {id}=useLocalSearchParams()

  const [notes, setNotes] = useState<Note[]>([])

  const fetchNotes = async () => {
    try {
      const data = await getNotes()
      setNotes(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])




  return (
    <View className='flex-1 p-6 pt-12 bg-[#09090b]'>
      <Text className='text-3xl font-bold mb-6 text-zinc-50'>
        My Notes
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/note/${item._id}`)}
          />
        )}
      />
    </View>
  )
}

export default notes