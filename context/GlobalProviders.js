import useCurrentTime, { formatDate } from "@/hooks/useCurrentTime";
import useGetPrayers from "@/hooks/useGetPrayerTimes";
import { useGetUserLocation } from "@/hooks/useGetUserLocation";
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [selectedId, setSelectedId] = useState(0);
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
				comingPrayer: selectedId,
				setComingPrayer: setSelectedId,
				userCity: city,
				currentTime: {
					minutes,
					hours,
					amPm,
				}
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};


export default GlobalProvider;
