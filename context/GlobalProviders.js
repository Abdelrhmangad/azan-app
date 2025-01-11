import Loader from "@/components/Loader";
import useCurrentTime, { formatDate } from "@/hooks/useCurrentTime";
import useGetPrayers from "@/hooks/useGetPrayerTimes";
import { useGetUserLocation } from "@/hooks/useGetUserLocation";
import useComingPrayer from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [comingPrayer, setComingPrayer] = useState(null);
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
				comingPrayer: comingPrayer,
				setComingPrayer: setComingPrayer,
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