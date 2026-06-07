import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function NoteDetail() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-3xl font-bold">
        Note Detail
      </Text>

      <TouchableOpacity
        className="
          bg-blue-500
          p-4
          rounded-xl
          mt-6
        "
      >
        <Text className="text-white text-center">
          View Summary
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="
          bg-green-500
          p-4
          rounded-xl
          mt-4
        "
      >
        <Text className="text-white text-center">
          Generate Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="
          bg-purple-500
          p-4
          rounded-xl
          mt-4
        "
      >
        <Text className="text-white text-center">
          Chat With Notes
        </Text>
      </TouchableOpacity>
    </View>
  );
}