import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, ScrollView, Dimensions, View } from 'react-native';
import HomeHeader from "@/components/home/HomeHeader";
import HomePrayersTimes from "@/components/home/HomePrayersTimes";
const { width: screenWidth } = Dimensions.get('window'); // Get the screen width
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useGlobalContext } from '@/context/GlobalProviders';
const index = () => {
	const { formattedPrayerTimes } = useGlobalContext()

	return (
		<SafeAreaView className='relative bg-primary h-full px-5'>
			<HomeHeader />
			<ScrollView>
				<FlatList
					data={formattedPrayerTimes}
					horizontal // Enable horizontal scrolling
					pagingEnabled // Snap each item to the screen
					decelerationRate="fast" // Smooth scrolling
					snapToAlignment="center" // Ensure items are centered
					centerContent={true}
					snapToInterval={screenWidth - 100} // Width of item + spacing
					showsHorizontalScrollIndicator={true} // Hide the scroll indicator
					keyExtractor={(item) => item.hijriDate}
					renderItem={({ item }) => (
						<LinearGradient
							colors={['#30304A', 'transparent']} // Gradient colors
							start={{ x: 1, y: 0 }}
							end={{ x: 1, y: 1 }}
							className='rounded-lg p-2 pt-3 mx-2'
							key={item.hijriDate}
							style={{ width: screenWidth - 55, height: '100%', borderRadius: 10 }}
						>
							<View
								className={`flex-row items-center justify-between mb-2 p-3 rounded-lg`}
							>
								<MaterialCommunityIcons
									name={"chevron-left"}
									size={24}
									color="white"
									backgroundColor="#49496F"
									style={{ borderRadius: 5 }}
								/>
								<Text className='text-white font-pmedium text-lg mr-auto ml-4'>{item.hijriDate}</Text>
								{formattedPrayerTimes.length > 1 && (
									<MaterialCommunityIcons
										name={"chevron-right"}
										size={24}
										color="white"
										backgroundColor="#49496F"
										style={{ borderRadius: 5 }}
									/>
								)}
							</View>
							<HomePrayersTimes prayerTimes={item.prayerTimes} />
						</LinearGradient>
					)}
				/>
			</ScrollView>
		</SafeAreaView >
	)
}

export default index
