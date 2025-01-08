import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export const useGetUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            if (location) {
                let { latitude, longitude } = location.coords;
                let addressResponse = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });

                setAddress(addressResponse[0]); // Use the first result
            }
        })();
    }, []);

    return {
        location: location ? { lat: location.coords.latitude, long: location.coords.longitude } : null,
        full_address: address,
        city: address?.city ?? ''
    };
};
