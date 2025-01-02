import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import EmptyState from '@/components/EmptyState'
import { getAllPosts } from '@/lib/appWrite'
import useAppwrite from '@/lib/useAppWrite'


const Home = () => {
	const { data: posts, loading, refetch } = useAppwrite(getAllPosts);

	const [refreshing, setRefreshing] = useState(false);
	console.log("data", posts);
	
	const onRefresh = async () => {
	  setRefreshing(true);
	  await refetch();
	  setRefreshing(false);
	};
	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts ?? []}
				keyExtractor={(item) => item.title.toString()}
				renderItem={({ item }) => (
					<VideoCard
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item.creator.username}
						avatar={item.creator.avatar}
					/>
				)}
				ListHeaderComponent={(
					<View className='my-6 space-y-4 px-4'>
						<View className='justify-between items-start flex-row mb-6'>
							<View>
								<Text className='font-pmedium text-sm text-gray-100'>
									Welcome back,
								</Text>
								<Text className='font-psemibold text-2xl text-white'>
									Gads
								</Text>
							</View>
							<View className='mt-1.5'>
								<Image
									source={images.logoSmall}
									className='w-9 h-10 '
									resizeMode='contain'
								/>
							</View>
						</View>
						<SearchInput
							placeholder='Search for a video topic'
							className='bg-white'
							handleChangeText={() => { }}
							otherStyles=''
						/>

						<View className='w-full flex-1 pt-5 pb-8'>
							<Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>
							<Trending
								posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						subtitle="No videos found"
						title="Be the first to upload a video"
					/>
				)}
				refreshControl={
					<RefreshControl 
						refreshing={refreshing} 
						onRefresh={onRefresh} 
					/>
				}
			/>
		</SafeAreaView>
	)
}

export default Home

const styles = StyleSheet.create({})