import { DeviceHandle, DeviceRecord } from "../types/device";
import { WIFI_CONNECTED, DEFAULT_ACCOUNT_BALANCE } from "../constants/device.constants";
import { IDeviceService, IAccountService, IHardwareDispenser } from "../interfaces";

export class MockDeviceService implements IDeviceService {
    public getHandle(deviceId: string): DeviceHandle {
        return DeviceHandle.VALID;
    }

    public retrieveDeviceRecord(handle: DeviceHandle): DeviceRecord {
        return {
            getStatus: () => 0,
            getWifiConnection: () => WIFI_CONNECTED
        };
    }
}

export class MockAccountService implements IAccountService {
    public getBalance(accountId: string): number {
        return DEFAULT_ACCOUNT_BALANCE;
    }
}

export class MockHardwareDispenser implements IHardwareDispenser {
    public dispenseCash(handle: DeviceHandle, amount: number): void {
        console.log(`Dispensing $${amount}...`);
    }
}

