import { Stack } from "expo-router";

import "../global.css"

import {
  useAuthInit
} from "@/src/hooks/useAuthInit"
import {
  userAuthStore
} from "@/src/store/auth.store"
import { ActivityIndicator, View } from "react-native";



export default function RootLayout() {
  useAuthInit();

  const isLoading = userAuthStore(
    (state) => state.isLoading
  )

  if (isLoading) {
    return (
      <View
        className="
        flex-1
        justify-center
        items-center
      "
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return <>
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
   
  </>
}
