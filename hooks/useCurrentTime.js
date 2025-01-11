// Custom hook to get current time and format it
import { useState, useEffect } from 'react';

const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [amPm, setAmPm] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes();
            const amPm = now.getHours() >= 12 ? 'PM' : 'AM';

            setCurrentTime(`${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`);
            setHours(hours);
            setMinutes(minutes.toString().padStart(2, '0'));
            setAmPm(amPm);
        };

        const timer = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return { currentTime, hours, minutes, amPm };
};

export function formatDate(dateToBeFormatted) {
    const day = dateToBeFormatted.getDate().toString().padStart(2, '0');
    const month = (dateToBeFormatted.getMonth() + 1).toString().padStart(2, '0');
    const year = dateToBeFormatted.getFullYear();

    return `${day}-${month}-${year}`;
};

export default useCurrentTime;