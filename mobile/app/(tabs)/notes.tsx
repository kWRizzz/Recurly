import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import React,{
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
import{
  router
} from "expo-router"

const notes = () => {

  const [notes, setNotes] = useState<Note[]>([])

  const fetchNotes =async ()=>{
    try {
      const data= await getNotes()
      setNotes(data)      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])
  

  return (
    <View
      className=' flex-1 p-4 bg-gray-400'
    >
      <Text
        className=' text-3xl font-semibold mb-6'
      >notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=>(
          <NoteCard
            note={item}
            onPress={()=>router.push(`/note/${item._id}`)}
          />
        )}
      />
    </View>
  )
}

export default notes