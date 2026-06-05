import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
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


const onSubmit = (data: loginFromData) => {
  console.log(data);
  // Add your signup/login API call here
};


const signUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<loginFromData>({
    resolver: zodResolver(loginSchema)
  })
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
    </View>
  )
}

export default signUp