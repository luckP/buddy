import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/**
 * Requests location permissions on both Android and iOS.
 */
export const requestLocationPermission = async (): Promise<string> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location to show maps and markers.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else {
        return 'denied';
      }
    } catch (err) {
      console.warn(err);
      return 'error';
    }
  } else if (Platform.OS === 'ios') {
    const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (status === RESULTS.DENIED || status === RESULTS.UNAVAILABLE) {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result;
    }
    return status;
  }
  return 'unsupported';
};

/**
 * Checks if location permissions are granted.
 */
export const checkLocationPermission = async (): Promise<string> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted ? 'granted' : 'denied';
  } else if (Platform.OS === 'ios') {
    const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return status;
  }
  return 'unsupported';
};

/**
 * Displays an alert if permissions are denied.
 */
export const showPermissionDeniedAlert = () => {
  Alert.alert(
    'Permission Denied',
    'Location permission is required to use this feature. Please enable it in settings.',
    [{ text: 'OK' }]
  );
};
