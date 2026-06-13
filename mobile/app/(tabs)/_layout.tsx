import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { userAuthStore } from "@/src/store/auth.store";

export default function TabsLayout(){
    const isAuthenticated = userAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/signIn" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:"#a78bfa",
                tabBarInactiveTintColor:"#71717a",
                tabBarStyle:{
                    backgroundColor:"#18181b",
                    borderTopWidth: 1,
                    borderTopColor: "#27272a",
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60
                }
            }}
        >   

            <Tabs.Screen
                name="index"
                options={{
                    title:"Home",
                    tabBarIcon:({color,size})=>(
                        <Ionicons
                            name="home"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="notes"
                options={{
                    title:"Notes",
                    tabBarIcon:({color,size})=>(
                        <Ionicons
                            name="document-text"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="upload"
                options={{
                    title:"Upload",
                    tabBarIcon:({color,size})=>(
                        <Ionicons
                            name="cloud-upload"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title:"Profile",
                    tabBarIcon:({color,size})=>(
                        <Ionicons
                            name="person"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
        </Tabs>
    )
}