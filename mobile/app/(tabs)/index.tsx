import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import { 
  userAuthStore
 } from "@/src/store/auth.store";
import { 
  Note
 } from "@/src/types/note.types";
import { 
  getNotes
 } from "@/src/services/notes.services";

 import { 
  router,
  useLocalSearchParams
  } from "expo-router";

export default function App() {

  const user= userAuthStore(
    state=>state.user
  )

  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    
    const fetchNotes= async () => {
      try {
        const data= await getNotes()
        setNotes(data)
      } catch (error) {
        console.log(error)
      }
    }
    
  }, [])
  

  return (
    <View
      className="
        flex-1
        bg-white
        p-6
      "
    >

      <Text
        className="
          text-3xl
          font-bold
        "
      >
        👋 Welcome,
      </Text>

      <Text
        className="
          text-2xl
          font-semibold
          mt-2
        "
      >
        {user?.name}
      </Text>

      <View
        className="
          bg-blue-500
          p-5
          rounded-2xl
          mt-6
        "
      >
        <Text
          className="
            text-white
            text-lg
          "
        >
          Total Notes
        </Text>

        <Text
          className="
            text-white
            text-4xl
            font-bold
          "
        >
          {notes.length}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push(
            "/(tabs)/upload"
          )
        }
        className="
          bg-green-500
          p-4
          rounded-xl
          mt-6
        "
      >
        <Text
          className="
            text-center
            text-white
            font-semibold
          "
        >
          Upload New PDF
        </Text>
      </TouchableOpacity>

      <Text
        className="
          text-xl
          font-bold
          mt-8
          mb-4
        "
      >
        Recent Notes
      </Text>

      <FlatList
        data={notes.slice(0,5)}
        keyExtractor={
          item => item._id
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              router.push(
                `/note/${item._id}`
              )
            }
            className="
              border
              border-gray-200
              p-4
              rounded-xl
              mb-3
            "
          >
            <Text
              className="
                font-semibold
              "
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}