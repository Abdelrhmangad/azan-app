import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
	Button,
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import { icons } from "../constants";

const zoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1,
	},
};

const zoomOut = {
	0: {
		scale: 1,
	},
	1: {
		scale: 0.9,
	},
};

const TrendingItem = ({ activeItem, item }) => {
	const [play, setPlay] = useState(false);

	return (
		<Animatable.View
			className="mr-5"
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<VideoScreen
					videoSource={item.video}
				/>
			) : (
				<TouchableOpacity
					className="relative flex justify-center items-center"
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{
							uri: item.thumbnail,
						}}
						className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
						resizeMode="cover"
					/>

					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	);
};

const Trending = ({ posts }) => {
	const [activeItem, setActiveItem] = useState(posts[0]);

	const viewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	};

	return (
		<FlatList
			data={posts}
			horizontal
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 170 }}
		/>
	);
};

export default Trending;

import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

export function VideoScreen({ videoSource }) {
	const player = useVideoPlayer(videoSource, player => {
		player.loop = true;
		player.play();
	});

	const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

	return (
		<View style={styles.contentContainer}>
			<VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
			<View style={styles.controlsContainer}>
				<Button
					title={isPlaying ? 'Pause' : 'Play'}
					onPress={() => {
						if (isPlaying) {
							player.pause();
						} else {
							player.play();
						}
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 50,
	},
	video: {
		width: 350,
		height: 275,
	},
	controlsContainer: {
		padding: 10,
	},
});