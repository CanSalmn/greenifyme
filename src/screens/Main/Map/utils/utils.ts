
import { PermissionsAndroid, Rationale } from 'react-native';

import LocationError from './LocationError';

const { PERMISSIONS, RESULTS } = PermissionsAndroid;

export type Location = {
    /**
     * The latitude, in degrees
     */
    latitude: number;
    /**
     * The longitude, in degrees
     */
    longitude: number;
    /**
     * The altitude if available, in meters above the WGS 84 reference ellipsoid
     */
    altitude: number;
    /**
     * The estimated horizontal accuracy of this location, radial, in meters
     */
    accuracy: number;
    /**
     * The speed if it is available, in meters/second over ground
     */
    speed: any;
    /**
     * The UTC time of this fix, in milliseconds since January 1, 1970.
     */
    time: number;
    /**
     * (Android only) The bearing, in degrees
     */
    bearing?: number;
    /**
     * (Android only) The name of the provider that generated this fix
     */
    provider?: number;
    /**
     * (iOS only) The vertical accuracy of the location. Negative if the altitude is invalid
     */
    verticalAccuracy?: number;
    /**
     * (iOS only) The course of the location in degrees true North. Negative if course is invalid. (0.0 - 359.9 degrees, 0 being true North)
     */
    course?: number;
};

export type GetCurrentPositionOptions = {
    /**
     * Set `true` to use 'fine location' (GPS) our `false` to use 'course location' (Wifi, Bluetooth, 3G).
     *
     * Default: false
     */
    enableHighAccuracy: boolean;
    /**
     * The max time (in milliseconds) that you want to wait to receive a location.
     *
     * Default: 60000 (60 seconds)
     */
    timeout: number;
    /**
     * Android only
     * See the [React Native docs](https://reactnative.dev/docs/permissionsandroid#request)
     */
    rationale?: Rationale;
};

export async function requestAndroidPermission(
    enableHighAccuracy: boolean = false,
    rationale?: Rationale,
) {
    const permission = enableHighAccuracy
        ? PERMISSIONS.ACCESS_FINE_LOCATION
        : PERMISSIONS.ACCESS_COARSE_LOCATION

    const alreadyGranted = await PermissionsAndroid.check(permission);

    if (alreadyGranted) return true;

    const granted = await PermissionsAndroid.request(permission, rationale);

    if (granted !== RESULTS.GRANTED) {
        throw new LocationError('UNAUTHORIZED', 'Authorization denied');
    }

    return true;
}
