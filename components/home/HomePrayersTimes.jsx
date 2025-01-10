import React, { useEffect, useRef } from 'react';
import HomePrayerItem from "@/components/home/HomePrayerItem";
import { Audio } from "expo-av";
import { ScrollView } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProviders';
const HomePrayersTimes = ({ prayerTimes }) => {
    const { comingPrayerData: { nextPrayer } } = useGlobalContext();
    const soundRef = useRef(null);

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
            if (prayerTimes.length > 0) {
                prayerTimes.forEach((prayer) => {
                    const prayerTime = prayer.time.split(" ")[0]
                    if (prayerTime === currentTimeString) {
                        playAudio(prayer.audio);
                    }
                });
            }
        }, 1000); // Check every minute

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
                    selected={nextPrayer?.name === prayer.name}
                />
            ))}
        </ScrollView>
    )
}

export default HomePrayersTimes
