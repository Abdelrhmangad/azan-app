import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProviders'

const index = () => {
  const { isLoading, isLoggedIn, user } = useGlobalContext();
  console.log("isLoading", isLoading)
  console.log("isLogged in", isLoggedIn)
  console.log("user", user)


  if (user) return <Redirect href="/home" />

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center h-full px-4'>
          <Image source={images.logo} resizeMode='contain' className='w-[130px] h-[84px]' />
          <Image source={images.cards} resizeMode='contain' className='max-w-[380px] w-full max-h-[300px]' />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center max-w-[320px]'>
							Discover Endless Possibilities with <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode='contain'
              className='absolute -bottom-2 -right-10 w-[136px] max-h-[15px]'
						/>
          </View>
          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
						Where Creativity meets innovation: embark on a journey of limitless explorations with Aora.
					</Text>

          <CustomButton
            title='Continue with email'
            handlePress={() => router.push('sign-in')}
            containerStyles='w-full mt-7'
					/>
        </View>
      </ScrollView>
      <StatusBar style='auto' backgroundColor='#161622' />
    </SafeAreaView>
  )
}

export default index
