import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  generateQuiz,
  askQuestion
} from "@/src/services/ai.services";
import {
  QuizQuestion
} from "@/src/types/quiz.types";

import {
  useLocalSearchParams
} from "expo-router";
import { number } from 'zod';


const QuizScreen = () => {

  const { id } = useLocalSearchParams();

  const [questions,
    setQuestions] =
    useState<QuizQuestion[]>([]);
  const [score, setScore] = useState<number | null>(null);
    const [answers,
    setAnswers] =
      useState<
        Record<number,string>
      >({});

  useEffect(() => {

    const load = async () => {
      try {

        const data =
          await generateQuiz(
            id as string
          );

        setQuestions(
          [data]
        );

      } catch (error) {
        console.log(error)
      }
    }
    load()
  }, [])

  const submitQuiz = () => {
    let correct = 0;

    questions.forEach((
      question,
      index
    ) => {
      if (answers[index] == question.answer) {
        correct++;
      }
    });
    setScore(correct)
  }

  return (
    <ScrollView
      className="
        flex-1
        bg-white
        p-4
      "
    >

      <Text
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Quiz
      </Text>

      {questions.map(
        (
          question,
          qIndex
        ) => (

          <View
            key={qIndex}
            className="mb-8"
          >

            <Text
              className="
                text-lg
                font-semibold
                mb-4
              "
            >
              {question.question}
            </Text>

            {question.options.map(
              (
                option,
                index
              ) => (

                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setAnswers(
                      (
                        prev
                      ) => ({
                        ...prev,
                        [qIndex]:
                          option,
                      })
                    )
                  }
                  className="
                    border
                    rounded-xl
                    p-4
                    mb-2
                  "
                >
                  <Text>
                    {option}
                  </Text>
                </TouchableOpacity>

              )
            )}

          </View>

        )
      )}

      <TouchableOpacity
        onPress={submitQuiz}
        className="
          bg-blue-500
          p-4
          rounded-xl
          mb-10
        "
      >
        <Text
          className="
            text-white
            text-center
          "
        >
          Submit Quiz
        </Text>
      </TouchableOpacity>

      {score !== null && (

        <Text
          className="
            text-center
            text-2xl
            font-bold
          "
        >
          Score:
          {" "}
          {score}
          /
          {questions.length}
        </Text>

      )}

    </ScrollView>
  )
}

export default QuizScreen
