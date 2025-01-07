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
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';

            setCurrentTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${amPm}`);
            setHours(hours);
            setMinutes(minutes);
            setAmPm(amPm);

        };

        const timer = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return { currentTime, hours, minutes, amPm };
};

export default useCurrentTime;