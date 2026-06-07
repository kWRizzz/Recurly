import {
    View,
    Text,
    TouchableOpacity,

} from 'react-native'
import React from 'react'
import {
    Note
} from "@/src/types/note.types"

interface Props {
    note: Note,
    onPress: () => void
}

const NoteCard = ({
    note,
    onPress
}: Props) => {


    return (
        <TouchableOpacity
            onPress={onPress}
            className=' bg-white p-4 rounded-xl mb-5 border border-gray-200'
        >
            <Text
                className=' text-lg font-semibold'
            >
                {note.title}
            </Text>

            <Text
                className="text-gray-500 mt-2"
                numberOfLines={2}
            >
                {note.summary ||
                    "No summary available"}
            </Text>
        </TouchableOpacity>
    )
}

export default NoteCard