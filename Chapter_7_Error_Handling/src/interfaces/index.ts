import { DeviceHandle, DeviceRecord } from "../types/device";

export interface IDeviceValidator {
    ensureDeviceReady(): void;
    acquireDeviceHandle(): DeviceHandle;
}

export interface IAccountValidator {
    ensureSufficientFunds(accountId: string, amount: number): void;
}

export interface ICashDispenser {
    dispense(handle: DeviceHandle, amount: number): void;
}

export interface IErrorHandler {
    handle(error: unknown): void;
}

export interface IDeviceService {
    getHandle(deviceId: string): DeviceHandle;
    retrieveDeviceRecord(handle: DeviceHandle): DeviceRecord;
}

export interface IAccountService {
    getBalance(accountId: string): number;
}

export interface IHardwareDispenser {
    dispenseCash(handle: DeviceHandle, amount: number): void;
}

