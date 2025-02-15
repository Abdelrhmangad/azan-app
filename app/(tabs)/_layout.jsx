import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProviders";

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='flex items-center justify-center gap-2 pt-12 w-[120px]'>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    const { loading } = useGlobalContext();

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: '#2ecc71',
                    tabBarInactiveTintColor: '#cdcde0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderColor: '#232533',
                        height: 84
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bookmarks"
                    options={{
                        title: "Bookmarks",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Bookmark"
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.settings}
                                color={color}
                                name="settings"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>

            <Loader isLoading={loading} />
            <StatusBar style='auto' backgroundColor='#161622' />
        </>
    );
};

export default TabLayout;
