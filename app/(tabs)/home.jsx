import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Animated, Text, ScrollView, TouchableOpacity } from 'react-native';
import HomeHeader from "@/components/home/HomeHeader";
import HomePrayerItem from "@/components/home/HomePrayerItem";
import HomePrayersTimes from "@/components/home/HomePrayersTimes";

import AzanAudio from "@/assets/azans-audios/azan-audio.mp3";
import { Audio } from "expo-av";

const index = () => {
	return (
		<SafeAreaView className='bg-primary h-full px-5'>
			<HomeHeader />
			<HomePrayersTimes />
		</SafeAreaView >
	)
}

export default index
