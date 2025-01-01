import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "@/constants"

const TabIcon = ({ icon, color, name, focused }: any) => {
    return (
        <View className='flex items-center justify-center gap-2 w-full pt-12'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'} text-center w-[70px]`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const _TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: '#ffa001',
                    tabBarInactiveTintColor: '#cdcde0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Home"
                                icon={icons.home}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="bookmarks"
                    options={{
                        title: 'Bookmarks',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Bookmarks"
                                icon={icons.bookmark}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Create"
                                icon={icons.plus}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Profile"
                                icon={icons.profile}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default _TabsLayout

const styles = StyleSheet.create({})