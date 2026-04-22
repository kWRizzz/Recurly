import { View, Text } from 'react-native'
import React from 'react'

const TaskCard = ({title}:{title:string}) => {
  return (
    <View
        className=' bg-slate-800 p-4 rounded-2xl mb-4'
    >
      <Text
        className=' text-white text-xl font-bold'
      >TaskCard is ====== {title}</Text>
    </View>
  )
}

export default TaskCard