import { useState, useEffect } from 'react';
import useGetUserLocation from "@/hooks/useGetUserLocation"

const useGetPrayers = (date, latitude, longitude) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    return {
        data,
        prayerTimes: data?.data?.timings,
        islamicDate: data?.data?.date?.hijri,
        error,
        isLoading: isLoading,
    };
};

export default useGetPrayers;
