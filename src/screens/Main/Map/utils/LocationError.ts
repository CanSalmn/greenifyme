export type LocationErrorCode =
    | 'CANCELLED'
    | 'UNAVAILABLE'
    | 'TIMEOUT'
    | 'UNAUTHORIZED';

export default class LocationError extends Error {
    code: LocationErrorCode;

    constructor(code: LocationErrorCode, message: string) {
        super(message);
        this.code = code;
    }
}

export const isLocationError = (error: unknown): error is LocationError => {
    return Boolean(
        typeof error === 'object' && error && 'code' in error && 'message' in error,
    );
};
