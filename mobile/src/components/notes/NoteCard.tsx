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
            className=' bg-[#18181b] p-5 rounded-2xl mb-4 border border-zinc-800/80 active:bg-zinc-800'
        >
            <Text
                className=' text-lg font-semibold text-zinc-100'
                numberOfLines={1}
            >
                {note.title}
            </Text>

            <Text
                className="text-zinc-400 mt-2 text-sm leading-relaxed"
                numberOfLines={2}
            >
                {note.summary ||
                    "No summary available"}
            </Text>
        </TouchableOpacity>
    )
}

export default NoteCard