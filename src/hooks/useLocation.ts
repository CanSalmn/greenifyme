import React, { useCallback, useRef, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { TextLabel } from '@localization';
const { LocationHook } = TextLabel;
interface IState {
    isLoading: boolean;
    coordinate?: Pick<GeoCoordinates, 'latitude' | 'longitude'>;
    error?: string;
    isDenied?: boolean;
    locationEnabled?: boolean;
}
const locationOptions: Geolocation.GeoOptions = {
    accuracy: {
        android: 'high',
        ios: 'best',
    },
    timeout: 15000,
    maximumAge: 10000,
    distanceFilter: 0,
};
export function useLocation() {
    const [state, setState] = useState<IState>({
        isLoading: true,
    });

    const mounted = useRef(true);

    const getLocation = React.useCallback(
        (
            successCb?: Geolocation.SuccessCallback,
            errorCb?: Geolocation.ErrorCallback,
        ) => {
            if (!mounted) {
                return;
            }

            setState((oldState: any) => ({ ...oldState, isLoading: true }));
            const onSuccess: Geolocation.SuccessCallback = (position) => {
                if (typeof successCb === 'function') {
                    successCb(position);
                }
                const { latitude, longitude } = position.coords;

                setState((oldState: any) => ({
                    ...oldState,
                    isLoading: false,
                    coordinate: {
                        latitude,
                        longitude,
                    },
                    error: null,
                    isDenied: false,
                    locationEnabled: true,
                }));
            };
            const onError: Geolocation.ErrorCallback = (error) => {
                if (typeof errorCb === 'function') {
                    errorCb(error);
                }
                setState((oldState: any) => ({
                    ...oldState,
                    isLoading: false,
                    error,
                    isDenied: true,
                    locationEnabled: false,
                }));
            };
            Geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
        },
        [],
    );

    const handlePermissionControl = useCallback(
        (
            successCb?: Geolocation.SuccessCallback,
            errorCb?: Geolocation.ErrorCallback,
        ) => {
            if (mounted.current) {
                hasLocationPermission()
                    .then((permissions) => {
                        if (typeof permissions === 'boolean' && permissions) {
                            getLocation(successCb, errorCb);
                        } else {
                            setState((oldState: any) => ({
                                ...oldState,
                                isLoading: false,
                                error: permissions ?? LocationHook.ErrorMessage,
                                isDenied: true,
                            }));
                        }
                    })
                    .catch((error) =>
                        setState((oldState: any) => ({
                            ...oldState,
                            isLoading: false,
                            error: error ?? LocationHook.ErrorMessage,
                            isDenied: true,
                        })),
                    );
            }
        },
        [getLocation],
    );

    React.useEffect(() => {
        handlePermissionControl();
        return () => {
            mounted.current = false;
        };
    }, [handlePermissionControl]);

    return { ...state, handlePermissionControl, getLocation };
}

const hasPermissionIOS = async () => {
    const openSetting = () => {
        Linking.openSettings().catch(() => {
            Alert.alert(LocationHook.SettingsAlert);
        });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
        return true;
    }

    if (status === 'denied') {
        Alert.alert(LocationHook.PermissionDenied);
    }

    if (status === 'disabled') {
        Alert.alert(LocationHook.DisabledAlert, '', [
            { text: LocationHook.OpenSettings, onPress: openSetting },
            { text: LocationHook.AlertDeny, onPress: () => { } },
        ]);
    }

    return false;
};

const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        return LocationHook.DeniedMessage;
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        return LocationHook.RevokeMessage;
    }

    return false;
};
