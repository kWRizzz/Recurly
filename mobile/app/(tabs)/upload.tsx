import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import React from 'react'

import * as DocumentPicker from "expo-document-picker"
import {
  uploadPdf
} from "@/src/services/notes.services"

export default function UploadScreen() {

  const handleUpload = async () => {
    try {

      const result =
        await DocumentPicker.getDocumentAsync({
          type:
            "application/pdf",
        });

      if (
        result.canceled
      ) {
        return;
      }

      const file =
        result.assets[0];

      await uploadPdf({
          uri: file.uri,
          name: file.name,
          mimiType:
            file.mimeType || undefined,
        });


    } catch (error) {
      console.log(error)
      Alert.alert(
          "Error",
          "Upload failed"
        );
    }
  }

  return (
    <View
      className=' flex-1 justify-center items-center px-6'
    >
      <Text
        className=' text-2xl font-semibold mb-6'
      >
        upload
      </Text>

      <TouchableOpacity
        className='bg-blue-600 px-6 py-5 rounded-xl'
        onPress={handleUpload}
      >
        <Text
          className=' text-white font-semibold'
        >
            Select PDF
        </Text>
      </TouchableOpacity>
    </View>
  )
}
