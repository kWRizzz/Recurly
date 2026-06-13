import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import React, { useState, useRef } from 'react'
import { askQuestion } from "@/src/services/ai.services"
import { Message } from "@/src/types/chat.types"
import { router, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSubmit = async () => {
    if (!question.trim() || sending) {
      return;
    }

    const userQuestion = question.trim();
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      text: userQuestion
    }

    setMessages(prev => [...prev, userMessage])
    setQuestion("");
    setSending(true);

    // Scroll to end
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const answer = await askQuestion(id as string, userQuestion)
      const aiMessage = {
        id: `${Date.now()}-ai`,
        role: "assistant" as const,
        text: answer,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage = {
        id: `${Date.now()}-err`,
        role: "assistant" as const,
        text: "Sorry, I encountered an error while retrieving the answer. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setSending(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#09090b]"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header Bar */}
      <View className="flex-row items-center px-6 pt-12 pb-4 border-b border-zinc-900 bg-[#09090b]">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#18181b] border border-zinc-800 p-2.5 rounded-full mr-4 active:bg-zinc-800"
        >
          <Ionicons name="arrow-back" size={20} color="#f4f4f5" />
        </TouchableOpacity>
        <Text className="text-zinc-50 font-bold text-xl">Chat with Notes</Text>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20 px-8">
            <View className="bg-zinc-900 border border-zinc-800 p-6 rounded-full mb-4">
              <Ionicons name="chatbubbles" size={36} color="#a78bfa" />
            </View>
            <Text className="text-zinc-200 font-bold text-xl text-center">Ask your Study Assistant</Text>
            <Text className="text-zinc-500 text-sm mt-2 text-center leading-relaxed">
              Ask any question about the uploaded document. Your AI assistant will answer using only facts from your notes.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            className={`
              p-4
              rounded-2xl
              mb-4
              max-w-[85%]
              ${item.role === "user"
                ? "bg-violet-600 rounded-tr-none self-end"
                : "bg-[#18181b] border border-zinc-800/80 rounded-tl-none self-start"
              }
            `}
          >
            <Text
              className={`text-base leading-relaxed ${
                item.role === "user" ? "text-white font-medium" : "text-zinc-100"
              }`}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Loading indicator when generating answer */}
      {sending && (
        <View className="flex-row items-center px-6 py-2">
          <ActivityIndicator size="small" color="#a78bfa" />
          <Text className="text-zinc-500 text-sm ml-2 font-medium">Assistant is typing...</Text>
        </View>
      )}

      {/* Sticky Input Panel at bottom */}
      <View className="flex-row p-4 border-t border-zinc-900 bg-[#09090b] items-center">
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Ask anything about these notes..."
          placeholderTextColor="#71717a"
          editable={!sending}
          className="
            flex-1
            border
            border-zinc-800
            rounded-xl
            px-4
            py-3.5
            bg-[#18181b]
            text-zinc-100
            mr-2
          "
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={sending || !question.trim()}
          className={`
            bg-violet-600
            p-3.5
            justify-center
            items-center
            rounded-xl
            ${(sending || !question.trim()) ? 'opacity-50' : 'active:bg-violet-700'}
          `}
        >
          <Ionicons name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
