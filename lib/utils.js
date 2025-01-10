import { useEffect, useState } from 'react';

const useComingPrayer = (prayerTimes) => {
    const [nextPrayer, setNextPrayer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [loadingNextPrayer, setLoadingNextPrayer] = useState(false);

    useEffect(() => {
        setLoadingNextPrayer(true)
        const timer = setInterval(() => {
            const currentDate = new Date();
            const currentHours = currentDate.getHours();
            const currentMinutes = currentDate.getMinutes();
            const currentTimeString = `${String(currentHours % 12 || 12).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')} ${currentHours >= 12 ? 'PM' : 'AM'}`;

            let nextPrayer = null;
            let remainingTime = null;
            prayerTimes[0]?.prayerTimes?.forEach((prayer) => {
                const prayerTime = prayer.time;
                const currentTimeInMinutes = convert12HourToMinutes(currentTimeString);
                const prayerTimeInMinutes = convert12HourToMinutes(prayerTime);

                if (prayerTimeInMinutes <= currentTimeInMinutes) {
                    const nextDayPrayerTimeInMinutes = prayerTimeInMinutes + 24 * 60;
                    if (!nextPrayer || nextDayPrayerTimeInMinutes < nextPrayer.timeInMinutes) {
                        nextPrayer = { ...prayer, timeInMinutes: nextDayPrayerTimeInMinutes };
                        remainingTime = nextDayPrayerTimeInMinutes - currentTimeInMinutes;
                    }
                } else {
                    if (!nextPrayer || prayerTimeInMinutes < nextPrayer.timeInMinutes) {
                        nextPrayer = { ...prayer, timeInMinutes: prayerTimeInMinutes };
                        remainingTime = prayerTimeInMinutes - currentTimeInMinutes;
                    }
                }
            });

            setNextPrayer(nextPrayer);
            setRemainingTime(remainingTime);
        }, 1000);
        setLoadingNextPrayer(false)

        return () => clearInterval(timer);
    }, [prayerTimes]);

    return { loadingNextPrayer: loadingNextPrayer, nextPrayer, remainingTime: formatTimeRemaining(remainingTime) };
};

export default useComingPrayer;


// Helper function to convert 12-hour time (e.g., "05:44 AM") to minutes since midnight
const convert12HourToMinutes = (time12h) => {
    if (time12h) {
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") {
            hours = "00"; // Convert 12-hour format to 24-hour format for calculation
        }
        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12; // Convert PM times to 24-hour format
        }
        return parseInt(hours) * 60 + parseInt(minutes); // Convert to total minutes since midnight
    }
};

// Convert time remaining in minutes to hours and minutes
export const formatTimeRemaining = (minutes) => {
    if (minutes === null) return null;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};