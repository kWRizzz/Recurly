import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { generateFlashcards } from "@/src/services/ai.services"
import { Flashcard } from "@/src/types/flashcards.types"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

const { width } = Dimensions.get("window");

const FlashcardsScreen = () => {
  const { id } = useLocalSearchParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Flip Animation Setup
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const cards = await generateFlashcards(id as string);
        setFlashcards(cards || []);
      } catch (error) {
        console.log("Error loading flashcards:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, [id]);

  const handleFlip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const resetFlip = () => {
    flipAnimation.setValue(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      resetFlip();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      resetFlip();
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Interpolations
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#09090b] justify-center items-center px-6">
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text className="text-zinc-400 font-semibold mt-4 text-lg">Generating Flashcards...</Text>
        <Text className="text-zinc-500 text-sm mt-1 text-center">AI is creating custom memory cards from your notes</Text>
      </View>
    );
  }

  if (flashcards.length === 0) {
    return (
      <View className="flex-1 bg-[#09090b] justify-center items-center px-6">
        <Text className="text-zinc-400 font-bold text-lg mb-2">No flashcards found</Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-xl mt-4">
          <Text className="text-zinc-300">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <View className="flex-1 bg-[#09090b] px-6 pt-12 pb-8 justify-between">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="bg-[#18181b] border border-zinc-800 p-2.5 rounded-full mr-4 active:bg-zinc-800">
            <Ionicons name="arrow-back" size={20} color="#f4f4f5" />
          </TouchableOpacity>
          <Text className="text-zinc-50 font-bold text-xl">Flashcards</Text>
        </View>
        <Text className="text-zinc-500 font-bold text-sm">
          {currentIndex + 1} / {flashcards.length}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mb-6">
        <View 
          className="h-full bg-violet-500" 
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </View>

      {/* Flashcard Flip Area */}
      <View className="flex-1 justify-center items-center py-4">
        <TouchableOpacity 
          activeOpacity={0.95} 
          onPress={handleFlip}
          style={styles.cardContainer}
        >
          {/* Front Side */}
          <Animated.View 
            style={[
              styles.card, 
              styles.cardFront, 
              frontAnimatedStyle,
              { borderColor: '#27272a', backgroundColor: '#18181b' }
            ]}
          >
            <View className="items-center px-6 text-center">
              <Text className="text-violet-400 font-bold uppercase tracking-wider text-xs mb-4">Concept / Question</Text>
              <Text className="text-zinc-100 text-2xl font-bold text-center leading-snug">
                {currentCard.front}
              </Text>
              <Text className="text-zinc-500 text-xs mt-10 font-semibold uppercase tracking-wider">Tap to Flip</Text>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View 
            style={[
              styles.card, 
              styles.cardBack, 
              backAnimatedStyle,
              { borderColor: '#7c3aed', backgroundColor: '#18181b' }
            ]}
          >
            <View className="items-center px-6 text-center">
              <Text className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-4">Definition / Answer</Text>
              <Text className="text-zinc-200 text-lg leading-relaxed text-center font-medium">
                {currentCard.back}
              </Text>
              <Text className="text-zinc-500 text-xs mt-10 font-semibold uppercase tracking-wider">Tap to Flip Back</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Navigation Controls */}
      <View className="flex-row justify-between items-center px-4 mt-6">
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex-row items-center ${currentIndex === 0 ? 'opacity-30' : 'active:bg-zinc-800'}`}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className={`bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex-row items-center ${currentIndex === flashcards.length - 1 ? 'opacity-30' : 'active:bg-zinc-800'}`}
        >
          <Text className="text-white font-semibold mr-2">Next</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 48,
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 2.5,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    zIndex: 1,
  }
})

export default FlashcardsScreen