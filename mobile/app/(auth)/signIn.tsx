import {
  View,
  Text,
  TouchableOpacity
}
  from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import {
  Controller,
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import AppGUI from '@/src/components/ui/AppGUI'
import {
  registerFormData,
  registerSchema
} from '@/src/validation/auth.validation'
import { userAuthStore } from '@/src/store/auth.store'

const signIn = () => {
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema)
  })

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const onSubmit = (
    data: registerFormData
  ) => {
    console.log(data);
  }


  return (
    <View
      className=' flex-1 justify-center px-6 bg-white'
    >
      <Text
        className=' text-4xl font-bold mb-2'
      >
        Create Account
      </Text>
      <Text
        className=' text-gray-500 mb-8 '
      >
        Register to continue
      </Text>

      <Controller
        control={control}
        name='name'
        render={({
          field: {
            onChange,
            value
          }
        }) => (
          <AppGUI
            placeholder="Name"
            value={value}
            onChangeText={onChange}
            error={
              errors?.name?.message
            }

          />
        )}
      />

      <Controller
        control={control}
        name='email'
        render={({
          field: {
            onChange,
            value
          }
        }) => (
          <AppGUI
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            error={
              errors?.email?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name='password'
        render={({
          field: {
            onChange,
            value
          }
        }) => (
          <AppGUI
            placeholder='Passowrd'
            value={value}
            onChangeText={onChange}
            error={
              errors?.password?.message
            }
          />
        )}
      />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className='bg-blue-500 p-4 rounded-xl mt-2'
      >
        <Text
          className=' text-center text-white font-semibold'
        >
          Register
        </Text>
      </TouchableOpacity>

      <Link
        href={"/(auth)/signUp"}
        className=' text-center mt-6'
      >
        Already A User Click Here
      </Link>
    </View>
  )
}

export default signIn