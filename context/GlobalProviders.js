import Loader from "@/components/Loader";
import useCurrentTime, { formatDate } from "@/hooks/useCurrentTime";
import useGetPrayers from "@/hooks/useGetPrayerTimes";
import { useGetUserLocation } from "@/hooks/useGetUserLocation";
import useComingPrayer from "@/lib/utils";
import React, { createContext, useContext, useRef, useState } from "react";
import { useAudio } from "@/hooks/useAudio";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const soundRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const { playAudio, stopAudio } = useAudio()
	const handlePlayAudio = async (audioFile) => {
		console.log("handlePlayAudio", audioFile);
		await playAudio(audioFile, soundRef, setIsPlaying);
	};

	const handleStopAudio = async () => {
		await stopAudio(soundRef, setIsPlaying);
	};


	const { location, city } = useGetUserLocation();
	const { prayerTimes, islamicDate, formattedPrayerTimes, isLoading: loadingPrayers } = useGetPrayers(formatDate(new Date()), location?.lat, location?.long);
	const { hours, minutes, amPm } = useCurrentTime();
	const { nextPrayer, remainingTime } = useComingPrayer(formattedPrayerTimes);

	return (
		<GlobalContext.Provider
			value={{
				loading: loadingPrayers,
				prayerTimes: prayerTimes,
				formattedPrayerTimes: formattedPrayerTimes,
				islamicDate: islamicDate,
				userCity: city,
				comingPrayerData: {
					nextPrayer,
					remainingTime
				},
				currentTime: {
					minutes,
					hours,
					amPm,
				},
				isPlaying,
				playAudio: handlePlayAudio,
				stopAudio: handleStopAudio,
			}}
		>
			{nextPrayer ? (
				children
			) : (
				<Loader />
			)}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;