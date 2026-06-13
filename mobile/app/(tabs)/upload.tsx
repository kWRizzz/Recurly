import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from "expo-document-picker"
import { uploadPdf } from "@/src/services/notes.services"
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function UploadScreen() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      setUploading(true);

      await uploadPdf({
        uri: file.uri,
        name: file.name,
        mimeType: file.mimeType || undefined,
      });

      Alert.alert(
        "Success",
        "PDF uploaded and summarized successfully!",
        [
          {
            text: "OK",
            onPress: () => router.push("/(tabs)/notes")
          }
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Upload Failed",
        "An error occurred while processing the PDF. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <View className='flex-1 justify-center items-center px-6 bg-[#09090b]'>
      <Text className='text-3xl font-extrabold mb-2 text-zinc-50'>
        Upload Material
      </Text>
      
      <Text className='text-zinc-400 mb-10 text-center font-medium px-4'>
        Upload a PDF textbook, note, or study sheet to generate instant AI summaries & quizzes
      </Text>

      <TouchableOpacity
        className={`w-full bg-[#18181b] border-2 border-zinc-800 border-dashed rounded-3xl p-12 justify-center items-center active:bg-zinc-900 ${uploading ? 'opacity-70' : ''}`}
        onPress={handleUpload}
        disabled={uploading}
      >
        {uploading ? (
          <View className="items-center">
            <ActivityIndicator size="large" color="#a78bfa" />
            <Text className='text-violet-400 font-semibold mt-4 text-lg'>
              AI is summarizing PDF...
            </Text>
            <Text className='text-zinc-500 text-sm mt-1 text-center'>
              This might take a minute depending on the PDF size
            </Text>
          </View>
        ) : (
          <View className="items-center">
            <View className="bg-zinc-800 p-5 rounded-full mb-4">
              <Ionicons name="cloud-upload" size={40} color="#a78bfa" />
            </View>
            <Text className='text-zinc-200 font-bold text-xl'>
              Select PDF Document
            </Text>
            <Text className='text-zinc-500 text-sm mt-2 text-center'>
              Supports PDF documents up to 10MB
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}
