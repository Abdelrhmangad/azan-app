import React, { useEffect, useRef, useState } from 'react';
import HomePrayerItem from "@/components/home/HomePrayerItem";
import { Audio } from "expo-av";
import { ScrollView } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProviders';
import { convertTo12HourFormat } from '@/lib/apiStructureFn';
const HomePrayersTimes = ({ prayerTimes }) => {
    const { comingPrayerData: { nextPrayer, remainingTime }, playAudio } = useGlobalContext();
    // Check if the current time matches any prayer time
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTimeString = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;
            const currentTimeFormat = convertTo12HourFormat(currentTimeString).split(" ")[0];
            prayerTimes.forEach((prayer) => {
                const prayerTime = prayer.time.split(" ")[0];
                // console.log("Current Time: ", currentTimeFormat);
                // console.log("Prayer Time: ", prayerTime);
                // console.log("prayerTime === currentTimeFormat: ", prayerTime === currentTimeFormat);

                if (prayerTime === currentTimeFormat) {
                    playAudio(prayer.audio);
                }
            });
        }, 60000); // Check every minute

        // Configure audio mode for background playback
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
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <ScrollView >
            {prayerTimes.length > 0 && prayerTimes.map((prayer, index) => (
                <HomePrayerItem
                    key={prayer.name}
                    item={prayer}
                    selected={nextPrayer.name === prayer.name}
                />
            ))}
        </ScrollView>
    )
}

export default HomePrayersTimes
