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
    <View className="flex-1 p-6 bg-white">

      <Text className="text-3xl font-bold mb-8">
        Profile
      </Text>

      <View
        className="
          bg-gray-100
          p-4
          rounded-xl
        "
      >
        <Text className="text-xl font-semibold">
          {user?.name}
        </Text>

        <Text className="text-gray-600 mt-2">
          {user?.email}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="
          bg-red-500
          p-4
          rounded-xl
          mt-8
        "
      >
        <Text className="text-center text-white">
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default profile