import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import React, { useState } from 'react'

import{
  askQuestion
}from "@/src/services/ai.services"
import{
  Message
} from "@/src/types/chat.types"

import{
  useLocalSearchParams
} from "expo-router"

const ChatScreen = () => {

  const {id}= useLocalSearchParams();

  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<Message[]>([]);


  const handleSubmit= async () => {
      if(!question.trim()){
        return;
      }

      const userMessage={
        id:Date.now().toString(),
        role:"user" as const,
        text:question
      }

      setMessage(prev=>[
        ...prev,userMessage
      ])

      setQuestion("");

      try {
        const answer= await askQuestion(id as string,question)

        const aiMessage = {
          id:
            `${Date.now()}-ai`,
          role:
            "assistant" as const,
          text:
            answer,
        };

        setMessage(prev => [
          ...prev,
          aiMessage
        ]);

      } catch (error) {
         console.log(error);
      }
  }

  return (
    <View className='flex-1 bg-white'>
      <FlatList
        data={message}
        keyExtractor={}
      />
    </View>
  )
}

export default ChatScreen
