import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { generateQuiz } from "@/src/services/ai.services";
import { QuizQuestion } from "@/src/types/quiz.types";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const QuizScreen = () => {
  const { id } = useLocalSearchParams();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await generateQuiz(id as string);
        setQuestions(data || []);
      } catch (error) {
        console.log("Error loading quiz:", error);
      } finally {
        setLoading(false);
      }
    }
    load()
  }, [])

  const submitQuiz = () => {
    if (Object.keys(answers).length < questions.length && !submitted) {
      alert("Please answer all questions before submitting!");
      return;
    }

    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  }

  const handleSelectOption = (qIndex: number, option: string) => {
    if (submitted) return; // Disable selection after submit
    setAnswers(prev => ({
      ...prev,
      [qIndex]: option
    }));
  };

  const getOptionStyle = (qIndex: number, option: string, correctAnswer: string) => {
    const isSelected = answers[qIndex] === option;

    if (submitted) {
      if (option === correctAnswer) {
        // Correct answer option (highlight green)
        return "border-emerald-500 bg-emerald-950/30";
      }
      if (isSelected && option !== correctAnswer) {
        // Selected incorrect answer (highlight red)
        return "border-rose-500 bg-rose-950/30";
      }
      return "border-zinc-800 bg-[#18181b] opacity-50";
    }

    if (isSelected) {
      // Selected but not yet submitted (highlight violet)
      return "border-violet-500 bg-violet-950/30";
    }

    // Default state
    return "border-zinc-800 bg-[#18181b]";
  };

  const getOptionTextStyle = (qIndex: number, option: string, correctAnswer: string) => {
    const isSelected = answers[qIndex] === option;

    if (submitted) {
      if (option === correctAnswer) return "text-emerald-400 font-semibold";
      if (isSelected && option !== correctAnswer) return "text-rose-400 font-semibold";
      return "text-zinc-500";
    }

    if (isSelected) return "text-violet-300 font-semibold";
    return "text-zinc-300";
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#09090b] justify-center items-center px-6">
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text className="text-zinc-400 font-semibold mt-4 text-lg">Generating Quiz...</Text>
        <Text className="text-zinc-500 text-sm mt-1 text-center">AI is creating 5 custom MCQs based on your notes</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#09090b] px-6 pt-12" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="bg-[#18181b] border border-zinc-800 p-2.5 rounded-full mr-4 active:bg-zinc-800">
          <Ionicons name="arrow-back" size={20} color="#f4f4f5" />
        </TouchableOpacity>
        <Text className="text-zinc-50 font-bold text-xl">Practice Quiz</Text>
      </View>

      {questions.map((question, qIndex) => (
        <View key={qIndex} className="mb-8 bg-[#18181b]/50 border border-zinc-900 p-5 rounded-2xl">
          <View className="flex-row mb-3">
            <Text className="text-violet-400 font-bold text-base mr-2">Q{qIndex + 1}.</Text>
            <Text className="text-zinc-100 text-base font-semibold flex-1">
              {question.question}
            </Text>
          </View>

          {question.options.map((option, index) => {
            const optionStyle = getOptionStyle(qIndex, option, question.answer);
            const optionTextStyle = getOptionTextStyle(qIndex, option, question.answer);

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectOption(qIndex, option)}
                disabled={submitted}
                className={`border rounded-xl p-4 mb-2 active:bg-zinc-800 flex-row items-center justify-between ${optionStyle}`}
              >
                <Text className={`text-base flex-1 ${optionTextStyle}`}>
                  {option}
                </Text>
                
                {submitted && option === question.answer && (
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                )}
                {submitted && answers[qIndex] === option && option !== question.answer && (
                  <Ionicons name="close-circle" size={20} color="#f43f5e" />
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      ))}

      {!submitted ? (
        <TouchableOpacity
          onPress={submitQuiz}
          className="bg-violet-600 p-4 rounded-xl mb-12 active:bg-violet-700 shadow-md shadow-violet-950/20"
        >
          <Text className="text-white text-center font-bold text-lg">
            Submit Quiz
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="bg-[#18181b] border border-zinc-800 p-6 rounded-2xl items-center mb-12">
          <Text className="text-zinc-400 font-semibold text-lg">Quiz Completed!</Text>
          <Text className="text-zinc-100 text-4xl font-black mt-2">
            {score ?? 0} / {questions.length}
          </Text>
          <Text className="text-zinc-500 text-sm mt-2 text-center">
            {(score ?? 0) === questions.length
              ? "Perfect score! Outstanding work! 🎉"
              : (score ?? 0) >= questions.length / 2
              ? "Good job! Review the incorrect answers and try again. 👍"
              : "Review your study materials and take the quiz again to improve. 📚"}
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-xl mt-6 active:bg-zinc-700"
          >
            <Text className="text-zinc-300 font-semibold text-base">Back to Note</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default QuizScreen
