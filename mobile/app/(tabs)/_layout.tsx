import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { userAuthStore } from "@/src/store/auth.store";

export default function TabsLayout(){
    const isAuthenticated = userAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/signUp" />;
    }

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