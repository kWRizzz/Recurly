import {
    View,
    Text,
    TextInput
} from 'react-native'

interface prop {
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    error?: string,
    secureTextEntry?: boolean
}



const AppGUI = ({
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry
}: prop) => {
    return (
        <View
            className=' mb-4'
        >
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={
                    secureTextEntry
                }
                className="
          border
          border-gray-300
          rounded-xl
          p-4
          bg-white
        "
            />

            {error && (
                <Text className="text-red-500 mt-1">
                    {error}
                </Text>
            )}
        </View>
    )
}

export default AppGUI