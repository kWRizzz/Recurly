import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const signIn = () => {
  return (
    <View
        className=' flex-1 justify-center items-center bg-yellow-100'
    >
      <Text>DOnt have an accoutn</Text>
    <Link
        href={"/(auth)/signUp"}
        className=" bg-black  py-2.5 px-4 rounded-2xl text-white mt-2 "
    >
        SingUP
    </Link>
    </View>
  )
}

export default signIn