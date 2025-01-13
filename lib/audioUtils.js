import { Audio } from 'expo-av';

export const playAudio = async (audioFile, soundRef, setIsPlaying) => {
    try {
        // Stop the currently playing audio (if any)
        if (soundRef.current) {
            await stopAudio(soundRef, setIsPlaying);
        }

        // Load and play the new audio
        const { sound } = await Audio.Sound.createAsync(audioFile);
        soundRef.current = sound; // Store the sound object in the ref
        setIsPlaying(true); // Set the playing state to true
        await sound.playAsync();

        // Unload the sound when it finishes playing
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                sound.unloadAsync(); // Clean up the sound object
                soundRef.current = null; // Clear the ref
                setIsPlaying(false); // Set the playing state to false
            }
        });
    } catch (error) {
        console.error('Error playing audio:', error);
    }
};

export const stopAudio = async (soundRef, setIsPlaying) => {
    if (soundRef.current) {
        await soundRef.current.stopAsync(); // Stop the audio
        await soundRef.current.unloadAsync(); // Unload the audio
        soundRef.current = null; // Clear the ref
        setIsPlaying(false); // Set the playing state to false
    }
};