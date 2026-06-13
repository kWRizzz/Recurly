import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect, router } from 'expo-router'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AppGUI from '@/src/components/ui/AppGUI'
import {
  registerFormData,
  registerSchema
} from '@/src/validation/auth.validation'
import { userAuthStore } from '@/src/store/auth.store'
import { registerUser } from '@/src/services/auth.services'
import { setAuthData } from '@/src/utils/storage.helper'

const SignUpScreen = () => {
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
  const setAuth = userAuthStore((state) => state.setAuth);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const onSubmit = async (data: registerFormData) => {
    try {
      setSubmitting(true);
      setErrorMsg("");
      const response = await registerUser(
        data.name,
        data.email,
        data.password
      );

      // Store locally
      await setAuthData(response.token, response.user);

      // Set Zustand state
      setAuth(response.token, response.user);

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-[#09090b]">
      <Text className="text-4xl font-bold mb-2 text-zinc-50">
        Create Account
      </Text>

      <Text className="text-zinc-400 mb-8 font-medium">
        Register to start your AI-powered learning
      </Text>

      {errorMsg ? (
        <Text className="text-rose-500 mb-4 font-semibold text-center">
          {errorMsg}
        </Text>
      ) : null}

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <AppGUI
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <AppGUI
            placeholder="Email Address"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <AppGUI
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={submitting}
        className={`bg-violet-600 p-4 rounded-xl mt-4 active:bg-violet-700 ${submitting ? 'opacity-70' : ''}`}
      >
        <Text className="text-center text-white font-semibold text-lg">
          {submitting ? 'Creating Account...' : 'Register'}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-zinc-400">Already have an account? </Text>
        <Link href="/(auth)/signIn" className="text-violet-400 font-semibold">
          Login
        </Link>
      </View>
    </View>
  )
}

export default SignUpScreen