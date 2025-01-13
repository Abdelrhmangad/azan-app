import { useRef, useState } from 'react';
import { playAudio, stopAudio } from '../lib/audioUtils';

export const useAudio = () => {
    const soundRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayAudio = async (audioFile) => {
        console.log("PlayAudio Invoked");
        if (soundRef.current) {
            await stopAudio(soundRef, setIsPlaying);
        }
        if (!soundRef.current) {
            await playAudio(audioFile, soundRef, setIsPlaying);
        }
    };

    const handleStopAudio = async () => {
        await stopAudio(soundRef, setIsPlaying);
    };

    return {
        isPlaying,
        playAudio: handlePlayAudio,
        stopAudio: handleStopAudio,
    };
};