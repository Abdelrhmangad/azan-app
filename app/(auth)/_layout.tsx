import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const _AuthLayout = () => {
    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#161622',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerShown: false,
                }}
            >
                <Stack.Screen name='SignIn' />
                <Stack.Screen name='SignUp' />
            </Stack>
            <StatusBar
                backgroundColor='#161622'
            />
        </>
    )
}

export default _AuthLayout

const styles = StyleSheet.create({})