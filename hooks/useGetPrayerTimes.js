import convertPrayerTimes from '@/lib/apiStructureFn';
import { useState, useEffect } from 'react';

const useGetPrayers = (date, latitude, longitude) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch prayer times data from the API
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            if (!latitude || !longitude) return;
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error.toString());
            }
        };

        fetchData();
        setIsLoading(false)
    }, [date, latitude, longitude]);

    // Format the fetched prayer times to our app structure
    const [formattedPrayerTimes, setFormattedPrayerTimes] = useState([])
    useEffect(() => {
        const fetchedTimes = data?.data?.timings;
        const fetchedIslamicDate = data?.data?.date?.hijri;
        if (fetchedTimes && Object.entries(fetchedTimes)?.length > 0) {
            const listObject = [{
                hijriDate: `${fetchedIslamicDate?.date.split("-")[0]} ${fetchedIslamicDate?.month?.en}, ${fetchedIslamicDate?.date.split("-")[2]}`,
                prayerTimes: convertPrayerTimes(fetchedTimes),
            }];
            setFormattedPrayerTimes(listObject);
        } else {
            setFormattedPrayerTimes([]);
        }
    }, [data?.data?.timings, isLoading]); // Add prayerTimes to the dependency array

    return {
        data,
        prayerTimes: data?.data?.timings,
        formattedPrayerTimes: formattedPrayerTimes,
        islamicDate: data?.data?.date?.hijri,
        error,
        isLoading: isLoading,
    };
};

export default useGetPrayers;
