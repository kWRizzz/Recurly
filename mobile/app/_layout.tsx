import { Stack } from "expo-router";

import "../global.css"

import {
  useAuthInit
} from "@/src/hooks/useAuthInit"
import {
  userAuthStore
} from "@/src/store/auth.store"


export default function RootLayout() {
  useAuthInit();

  const isLoading = userAuthStore(
    (state) => state.isLoading
  )

  if(isLoading){
    return null;
  }

  return <>
    <Stack
      screenOptions={{
        headerShown:false
      }}
    />
  </>
}
