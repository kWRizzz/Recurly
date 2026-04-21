import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-amber-700   text-white">
      <Text className="text-xl font-bold text-blue-500">
        

      </Text>
      <Link
        href={"/(auth)/signIn"}
        className=" bg-black  py-2.5 px-4 rounded-2xl text-white mt-2 "
      >
        LogIn
      </Link>
      <Link
        href={"/(tabs)/subscriptions/[id]"}
        className=" bg-black  py-2.5 px-4 rounded-2xl text-white mt-2 "
      >
        SubsCription
      </Link>
    </View>
  );
}