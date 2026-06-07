import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import {
  Controller,
  useForm
} from "react-hook-form";
import {
  zodResolver
} from "@hookform/resolvers/zod";
import {
  loginSchema,
  loginFromData
} from "@/src/validation/auth.validation";
import AppGUI from '@/src/components/ui/AppGUI';
import {
  router
} from "expo-router";


import {
  loginUser
} from "@/src/services/auth.services";
import {
  userAuthStore
} from "@/src/store/auth.store";
import {
  setAuthData
} from "@/src/utils/storage.helper"



const signUp = () => {
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const setAuth = userAuthStore((state) => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<loginFromData>({
    resolver: zodResolver(loginSchema)
  });

  // handle the submit login feature 
  const onSubmit = async (
    data: loginFromData
  ) => {
    try {
      console.log(data);
      const response = await loginUser(
        data.email,
        data.password
      );

      // setting up the or updating the user 
      await setAuthData(
        response.token,
        response.user
      );

      setAuth(
        response.token,
        response.user
      );

      router.replace(
        "/(tabs)"
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-4xl font-bold mb-2">
        Welcome Back
      </Text>

      <Text className="text-gray-500 mb-8">
        Login to continue
      </Text>

      <Controller
        control={control}
        name="email"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <AppGUI
            placeholder="Email"
            value={value}
            onChangeText={
              onChange
            }
            error={
              errors.email
                ?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <AppGUI
            placeholder="Password"
            value={value}
            onChangeText={
              onChange
            }
            secureTextEntry
            error={
              errors.password
                ?.message
            }
          />
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(
          onSubmit
        )}
        className="
          bg-blue-500
          p-4
          rounded-xl
          mt-2
        "
      >
        <Text className="text-center text-white font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      <Link
        href="/(auth)/signIn"
        className="text-center mt-6"
      >
        Don't have an account?
      </Link>
      <Link
        href="/(tabs)/upload"
        className="text-center mt-6"
      >
        Don't have an account?
      </Link>
    </View>
  )
}

export default signUp