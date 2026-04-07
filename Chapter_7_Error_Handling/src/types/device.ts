export enum DeviceHandle {
    INVALID = 0,
    VALID = 1
}

export interface DeviceRecord {
    getStatus(): number;
    getWifiConnection(): number;
}

