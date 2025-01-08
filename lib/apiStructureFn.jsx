import AzanAudio from "@/assets/azans-audios/azan-audio.mp3";

export default function convertPrayerTimes(prayerTimesObj) {
    const icons = {
        Fajr: "weather-sunset-up",
        Dhuhr: "weather-sunny",
        Asr: "weather-partly-cloudy",
        Maghrib: "weather-sunset-down",
        Isha: "weather-night",
    };
    if (prayerTimesObj) {
        return Object.entries(prayerTimesObj)
            .filter(([name]) => icons[name]) // Filter only the required prayer names
            .map(([name, time]) => {
                const formattedTime = convertTo12HourFormat(time);
                return {
                    time: formattedTime,
                    name,
                    icon: icons[name],
                    audio: AzanAudio,
                    audioDisabled: false,
                };
            });
    }
}

function convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

// Example usage
const prayerTimes = {
    Fajr: "05:02",
    Sunrise: "06:19",
    Dhuhr: "12:03",
    Asr: "15:20",
    Sunset: "17:47",
    Maghrib: "17:47",
    Isha: "19:17",
    Imsak: "04:52",
    Midnight: "00:03",
    Firstthird: "21:57",
    Lastthird: "02:08",
};