import Geolocation from "@react-native-community/geolocation";
import { Alert, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

type Location = {
    latitude: number;
    longitude: number;
}

/**
 * @description Fetches the user's current location.
 * @returns Promise<Location>
 */
const getUserLocation = () => {

    return new Promise<Location>(async (resolve, reject) => {

        const permission =
        Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        
        
        const permissionStatus = await check(permission);
        
        if (permissionStatus === RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const location: Location = { latitude, longitude };

                resolve(location);
            },
            (error) => {
                Alert.alert('Error', 'Unable to fetch location: ' + error.message);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } else if (permissionStatus === RESULTS.DENIED) {
            const requestStatus = await request(permission);
            if (requestStatus === RESULTS.GRANTED) {
                getUserLocation(); // Retry fetching location if granted
            } else {
                Alert.alert('Permission Denied', 'Location permission is required to show your location.');
            }
        } else {
            Alert.alert('Error', 'Location permission is not available.');
        }
    });
    };
    
    
    export default getUserLocation;