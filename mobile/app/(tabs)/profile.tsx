import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import React from 'react'

import {
  router
} from "expo-router";

import {
  userAuthStore
} from "@/src/store/auth.store";
import {
  removeData
} from "@/src/utils/storage.helper";

const profile = () => {

  const user = userAuthStore(
    state => state.user
  )
  const logout = userAuthStore(
    state => state.logout
  )

  const handleLogout = async () => {
    await removeData();
    logout();
    router.replace(
      `/(auth)/signIn`
    )
  }

  return (
    <View className="flex-1 p-6 pt-12 bg-[#09090b]">

      <Text className="text-3xl font-extrabold mb-8 text-zinc-50">
        Profile
      </Text>

      <View className="bg-[#18181b] border border-zinc-800/80 p-6 rounded-2xl">
        <Text className="text-xl font-bold text-zinc-100">
          {user?.name || "No Name"}
        </Text>

        <Text className="text-zinc-400 mt-1 text-base">
          {user?.email || "No Email"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-rose-600 p-4 rounded-xl mt-8 active:bg-rose-700"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default profile