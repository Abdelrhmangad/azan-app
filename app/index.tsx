import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const index = () => {
    return (
        <View className='flex flex-1 items-center justify-center bg-white'>
            <Text className='text-3xl'>Aora!</Text>
            <Link href={"/home"} className='text-blue-500'>
                Go to Home
            </Link>
            <StatusBar style="dark" />
        </View>
    )
}

export default index
