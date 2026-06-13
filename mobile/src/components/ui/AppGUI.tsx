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
        <View className='mb-4'>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#71717a"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                className="
                  border
                  border-zinc-800
                  rounded-xl
                  p-4
                  bg-zinc-900
                  text-zinc-100
                "
            />

            {error && (
                <Text className="text-rose-500 mt-1 text-sm font-medium">
                    {error}
                </Text>
            )}
        </View>
    )
}

export default AppGUI