import useCurrentTime, { formatDate } from "@/hooks/useCurrentTime";
import useGetPrayers from "@/hooks/useGetPrayerTimes";
import { useGetUserLocation } from "@/hooks/useGetUserLocation";
import { formatTimeRemaining } from "@/lib/utils";
import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [comingPrayer, setComingPrayer] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(null); // State for time remaining
	const { location, city } = useGetUserLocation();
	const { prayerTimes, islamicDate, formattedPrayerTimes, isLoading: loadingPrayers } = useGetPrayers(formatDate(new Date()), location?.lat, location?.long);
	const { hours, minutes, amPm } = useCurrentTime();

	return (
		<GlobalContext.Provider
			value={{
				loading: loadingPrayers,
				prayerTimes: prayerTimes,
				formattedPrayerTimes: formattedPrayerTimes,
				islamicDate: islamicDate,
				comingPrayer: comingPrayer,
				timeRemaining: formatTimeRemaining(timeRemaining), // Provide formatted time remaining
				setComingPrayer: setComingPrayer,
				userCity: city,
				currentTime: {
					minutes,
					hours,
					amPm,
				},
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;