import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { task } from "../utils/dummyData";
import TaskCard from "../components/TaskCard";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-amber-700   text-white">
        <Text>
            ProtoType 🚀
        </Text>
        <FlatList
          data={task}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({item})=>(
            <TaskCard
              title={item.title}
            />
          )}
        />
    </View>
  );
}