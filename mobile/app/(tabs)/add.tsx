import { View, Text, TextInput } from 'react-native'
import React from 'react'

const add = () => {
    return (
        <View
            className=' flex-1 justify-center items-center bg-slate-900'
        >
            <View>
                <Text
                    className=' text-white font-bold  text-5xl mb-4'
                >
                    Add-Task
                </Text>
            </View>
            <View>

                <TextInput
                    placeholder=' enter text'
                    placeholderTextColor="#94a3b8"
                    className="bg-slate-800 text-white p-3 rounded-xl"
                />

            </View>
        </View>
    )
}

export default add