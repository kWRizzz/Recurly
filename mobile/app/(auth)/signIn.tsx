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
  loginFromData,
  loginSchema
} from '@/src/validation/auth.validation'
import { userAuthStore } from '@/src/store/auth.store'
import { loginUser } from '@/src/services/auth.services'
import { setAuthData } from '@/src/utils/storage.helper'

const SignInScreen = () => {
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
  const setAuth = userAuthStore((state) => state.setAuth);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFromData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const onSubmit = async (data: loginFromData) => {
    try {
      setSubmitting(true);
      setErrorMsg("");
      const response = await loginUser(data.email, data.password);
      
      // Store locally
      await setAuthData(response.token, response.user);
      
      // Set Zustand state
      setAuth(response.token, response.user);

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.response?.data?.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View className='flex-1 justify-center px-6 bg-[#09090b]'>
      <Text className='text-4xl font-bold mb-2 text-zinc-50'>
        Welcome Back
      </Text>
      
      <Text className='text-zinc-400 mb-8 font-medium'>
        Login to continue your learning journey
      </Text>

      {errorMsg ? (
        <Text className="text-rose-500 mb-4 font-semibold text-center">
          {errorMsg}
        </Text>
      ) : null}

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value } }) => (
          <AppGUI
            placeholder="Email Address"
            value={value}
            onChangeText={onChange}
            error={errors?.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value } }) => (
          <AppGUI
            placeholder='Password'
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors?.password?.message}
          />
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={submitting}
        className={`bg-violet-600 p-4 rounded-xl mt-4 active:bg-violet-700 ${submitting ? 'opacity-70' : ''}`}
      >
        <Text className='text-center text-white font-semibold text-lg'>
          {submitting ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-zinc-400">Don't have an account? </Text>
        <Link href={"/(auth)/signUp"} className='text-violet-400 font-semibold'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignInScreen