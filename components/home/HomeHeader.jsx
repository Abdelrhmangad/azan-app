import React from 'react'
import { icons } from '@/constants'
import { Image, Text, View } from 'react-native'
import { Link } from 'expo-router'
import useCurrentTime from "@/hooks/useCurrentTime";
import { useGlobalContext } from '@/context/GlobalProviders';

const HomeHeader = () => {
    const { userCity, comingPrayerData, currentTime } = useGlobalContext();
    return (
        <View className='pt-6'>
            <View className='flex items-center justify-between flex-row'>
                <View
                    className='flex-row gap-2 items-center justify-center  text-white bg-gray-600/60 py-3 px-5 rounded-full self-start max-w-[150px]'
                >
                    <Image source={icons.location} resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text
                        className='text-white text-lg'
                        numberOfLines={1} // Restrict text to one line
                        ellipsizeMode='tail' // Add ellipsis at the end
                    >
                        {userCity}
                    </Text>
                </View>
                <Link
                    href="/(tabs)/settings"
                    className='bg-gray-600/60 px-3 py-3 rounded-full'
                >
                    <Image source={icons.settings} resizeMode='contain' style={{ width: 20, height: 20 }} />
                </Link>
            </View>
            <View
                className='flex-col items-center'
                style={{ height: 130 }}
            >
                <View className='pt-10 flex-col items-center justify-center'>
                    <Text className='text-white text-4xl font-pmedium'>{comingPrayerData.nextPrayer?.name ?? ""}</Text>
                    <Text
                        className='text-6xl text-white pt-10 font-psemibold'
                    >
                        {currentTime.hours}:{currentTime.minutes}{" "}
                        <Text className='text-lg text-white font-pregular'>{currentTime.amPm}</Text>
                    </Text>
                </View>
            </View>
            <View className='mb-6 flex-col items-center'>
                <View className='flex-col items-center justify-center'>
                    <Text className='text-gray-400 text-md font-pregular'>Next prayer in <Text className='text-[#E6E6EF]'>{comingPrayerData.remainingTime}</Text></Text>
                </View>
            </View>
        </View>
    )
}

export default HomeHeader