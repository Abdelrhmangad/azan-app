import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
    return (
        <View className='flex flex-1 items-center justify-center bg-red-200'>
            <Text>Aora</Text>
            <Link href={"/profile"}>
                Go to profile
            </Link>
        </View>
    )
}

export default index
