import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Animated, Text, ScrollView, TouchableOpacity } from 'react-native';
import HomeHeader from "@/components/HomeHeader";
import HomePrayerItem from "@/components/HomePrayerItem";
import AzanAudio from "@/assets/azans-audios/azan-audio.mp3";
import { Audio } from "expo-av";

const index = () => {
	const [selectedId, setSelectedId] = useState(0);
	const soundRef = useRef(null); // Ref to store the current sound object
	const overlayAnim = useRef(new Animated.Value(-100)).current; // Initial position off-screen

	const prayerTimes = [
		{
			time: "05:00 AM",
			name: "Fajr",
			icon: "weather-sunset-up", // Example icon from Material Community Icons
			audio: AzanAudio,
			audioDisabled: false,
		},
		{
			time: "12:30 PM",
			name: "Dhuhr",
			icon: "weather-sunny", // Example icon from Material Community Icons
			audio: AzanAudio,
			audioDisabled: false,
		},
		{
			time: "16:42 PM",
			name: "Asr",
			icon: "weather-partly-cloudy", // Example icon from Material Community Icons
			audio: AzanAudio,
			audioDisabled: false,
		},
		{
			time: "18:30 PM",
			name: "Maghrib",
			icon: "weather-sunset-down", // Example icon from Material Community Icons
			audio: AzanAudio,
			audioDisabled: false,
		},
		{
			time: "20:00 PM",
			name: "Isha",
			icon: "weather-night", // Example icon from Material Community Icons
			audio: AzanAudio,
			audioDisabled: false,
		},
	];

	// Function to stop the currently playing audio
	const stopAudio = async () => {
		if (soundRef.current) {
			await soundRef.current.stopAsync(); // Stop the audio
			await soundRef.current.unloadAsync(); // Unload the audio
			soundRef.current = null; // Clear the ref
		}
	};

	// Function to play audio
	const playAudio = async (audioFile) => {
		try {
			// Stop the currently playing audio (if any)
			await stopAudio();

			// Load and play the new audio
			const { sound } = await Audio.Sound.createAsync(audioFile);
			soundRef.current = sound; // Store the sound object in the ref
			await sound.playAsync();

			// Unload the sound when it finishes playing
			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.didJustFinish) {
					sound.unloadAsync(); // Clean up the sound object
					soundRef.current = null; // Clear the ref
				}
			});
		} catch (error) {
			console.error('Error playing audio:', error);
		}
	};

	// Check if the current time matches any prayer time
	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();

			const currentHours = now.getHours();
			const currentMinutes = now.getMinutes();
			const currentTimeString = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

			prayerTimes.forEach((prayer) => {
				const prayerTime = prayer.time.split(" ")[0]
				if (prayerTime === currentTimeString) {
					playAudio(prayer.audio);
					setSelectedId(prayer.name)
				}
			});
		}, 1000); // Check every minute

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []);

	// Configure audio mode for background playback
	useEffect(() => {
		const configureAudio = async () => {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				playsInSilentModeIOS: true, // Play audio in silent mode
				staysActiveInBackground: true, // Continue playing in the background
				shouldDuckAndroid: true, // Lower the volume of other apps while playing
				playThroughEarpieceAndroid: false,
			});
		};

		configureAudio();
	}, []);

	return (
		<SafeAreaView className='bg-primary h-full px-5'>
			<FlatList
				data={prayerTimes}
				keyExtractor={(item) => item.name.toString()}
				renderItem={({ item, index }) => (
					<HomePrayerItem
						key={item.name}
						item={item}
						index={index}
						playAudio={playAudio}
						pressHandler={() => setSelectedId(item.name)}
						selected={selectedId === item.name}
					/>
				)}
				ListHeaderComponent={(
					<HomeHeader />
				)}
			/>
		</SafeAreaView >
	)
}

export default index
