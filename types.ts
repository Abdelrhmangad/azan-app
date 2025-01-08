interface PrayerTime {
    time: string; // Format: "HH:MM AM/PM"
    name: string; // Prayer name, e.g., "Fajr", "Dhuhr"
    icon: string; // Icon name from Material Community Icons
    audio: any; // Replace `any` with the actual type of AzanAudio if known
    audioDisabled: boolean;
}

interface PrayerTimesForDate {
    hijriDate: string; // Example: "Rajab 09, 1446 AH"
    prayerTimes: PrayerTime[];
}
