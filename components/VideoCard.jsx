import { useEffect, useState } from "react";
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "@/constants";

export function VideoCard({ video, thumbnail, avatar, title, creator }) {
	// video params ==> should only be a video.mp4 file
	const [innerPlayer, setInnerPlayer] = useState(null)
	const player = useVideoPlayer({ uri: video }, (player) => {
		player.loop = true;
		player.showNowPlayingNotification = true;
		setInnerPlayer(player);
	});
	const [videoShown, showVideo] = useState(false);

	return (
		<View className="flex flex-col items-center px-4 mb-14 w-full">
			<View className="flex flex-row gap-3 items-start w-full">
				<View className="flex justify-center items-center flex-row flex-1">
					<View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
						<Image
							source={{ uri: avatar }}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>

					<View className="flex justify-center flex-1 ml-3 gap-y-1">
						<Text
							className="font-psemibold text-sm text-white"
							numberOfLines={1}
						>
							{title}
						</Text>
						<Text
							className="text-xs text-gray-100 font-pregular"
							numberOfLines={1}
						>
							{creator}
						</Text>
					</View>
				</View>

				<View className="pt-2">
					<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
				</View>
			</View>
			{videoShown ? (
				<VideoView
					style={{ width: '100%', height: 300, marginTop: 20 }}
					player={player}
					allowsFullscreen
					AudioMixingMode="doNotMix"
					allowsPictureInPicture
				/>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						showVideo(true);
						innerPlayer.play()
					}}
					className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
				>
					{/* URI: thumbnail is a remote url so we used it like that */}
					<Image
						source={{ uri: thumbnail }}
						className="w-full h-full rounded-xl mt-3"
						resizeMode="cover"
					/>

					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
}

export default VideoCard;
