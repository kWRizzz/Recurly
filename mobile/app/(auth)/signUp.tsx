import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const signUp = () => {
  return (
    <View
        className='flex-1 justify-center items-center bg-yellow-100'
    >
      <Text> Already Have An Accout </Text>
      <Link
        href={"/(auth)/signIn"}
        className=" bg-black  py-2.5 px-4 rounded-2xl text-white mt-2 "
      >
           SingIn
      </Link>
    </View>
  )
}

export default signUp