import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import React, { useState } from 'react'

import {
  askQuestion
} from "@/src/services/ai.services"
import {
  Message
} from "@/src/types/chat.types"

import {
  router,
  useLocalSearchParams
} from "expo-router"

const ChatScreen = () => {

  const { id } = useLocalSearchParams();

  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<Message[]>([]);


  const handleSubmit = async () => {
    if (!question.trim()) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      text: question
    }

    setMessage(prev => [
      ...prev, userMessage
    ])

    setQuestion("");

    try {
      const answer = await askQuestion(id as string, question)

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className={`
              mx-4
              my-2
              p-4
              rounded-xl
              ${item.role ===
                "user"
                ? "bg-blue-500"
                : "bg-gray-200"
              }
            `}
          >
            <Text
              className={
                item.role ===
                  "user"
                  ? "text-white"
                  : "text-black"
              }
            >
              {item.text}
            </Text>

            <View
              className="
          flex-row
          p-4
          border-t
        "
            >
              <TextInput
                value={question}
                onChangeText={
                  setQuestion
                }
                placeholder="Ask anything..."
                className="
            flex-1
            border
            rounded-xl
            px-4
            py-3
          "
              />

              <TouchableOpacity
                onPress={handleSubmit}
                className="
            bg-blue-500
            px-5
            justify-center
            rounded-xl
            ml-2
          "
              >
                <Text 
                className="text-white">
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />


    </View>
  )
}

export default ChatScreen
