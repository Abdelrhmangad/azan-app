import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { icons, images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProviders'
import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'


const index = () => {
	const { isLoading, isLoggedIn, user } = useGlobalContext();

	// if (user) return <Redirect href="/home" />
	function refreshing() {
	}

	function onRefresh() {

	}
	return (
		<SafeAreaView className='bg-primary h-full px-5'>
			<FlatList
				data={[1, 2, 3, 4, 5]}
				keyExtractor={(item) => item.toString()}
				renderItem={({ item }) => (
					<View className='bg-red-500'>
						<Text>
							{item}
						</Text>
					</View>
				)}
				ListHeaderComponent={(
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
									Itay el Baroud jfkasdjflkasdjfklasd fjaksldf
								</Text>
							</View>
							<Link
								href="/(tabs)/settings"
								className='bg-gray-600/60 px-3 py-3 rounded-full'
							>
								<Image source={icons.settings} resizeMode='contain' style={{ width: 20, height: 20 }} />
							</Link>
						</View>
						<View className='mb-6 flex-col items-center'>
							<View className='pt-10 flex-col items-center justify-center'>
								<Text className='text-white text-4xl leading-10 font-pmedium'>Fajr</Text>
								<Text
									className='text-6xl text-white pt-10 font-psemibold'
								>
									05:21
									<Text className='text-lg text-white font-pregular'>AM</Text>
								</Text>
							</View>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<Text>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae quae eius ipsum explicabo tenetur laudantium perferendis repudiandae laboriosam tempora, quas nesciunt fugiat. Quam ea aliquam perferendis dolores dolorem, non nihil.
					</Text>
				)}
			// refreshControl={
			// 	<RefreshControl
			// 		refreshing={refreshing}
			// 		onRefresh={onRefresh}
			// 	/>
			// }
			/>
			<StatusBar style='auto' backgroundColor='#161622' />
		</SafeAreaView>
	)
}

export default index
