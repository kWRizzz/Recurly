import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout(){
    return (
        <Tabs
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:"#3b82f6",
                tabBarStyle:{
                    backgroundColor:"#0f172a"
                }
            }}
        >   

            <Tabs.Screen
                name="index"
                options={{
                    title:"Home",
                    tabBarIcon:({color,size})=>{
                        <Ionicons
                            name="home"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title:"Add",
                    tabBarIcon:({color,size})=>{
                        <Ionicons
                            name="add-circle"
                            color={color}
                            size={size}
                        />
                    }
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title:"Profile",
                    tabBarIcon:({color,size})=>{
                        <Ionicons
                            name="person"
                            color="white"
                            size={size}
                        />
                    } 
                }}
            />

        </Tabs>
    )
}