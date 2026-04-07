import { DeviceHandle } from "../types/device";
import { DEFAULT_DEVICE_ID, WIFI_CONNECTED, DEVICE_SUSPENDED } from "../constants/device.constants";
import { DeviceLockedException } from "../exceptions/DeviceLockedException";
import { NetworkConnectionException } from "../exceptions/NetworkConnectionException";
import { IDeviceValidator, IDeviceService } from "../interfaces";

export class DeviceValidator implements IDeviceValidator {
    private readonly deviceService: IDeviceService;

    constructor(deviceService: IDeviceService) {
        this.deviceService = deviceService;
    }

    public ensureDeviceReady(): void {
        const handle = this.acquireDeviceHandle();

        const record = this.deviceService.retrieveDeviceRecord(handle);
        this.checkSuspended(record.getStatus());
        this.checkNetwork(record.getWifiConnection());
    }

    public acquireDeviceHandle(): DeviceHandle {
        const handle = this.deviceService.getHandle(DEFAULT_DEVICE_ID);
        if (handle === DeviceHandle.INVALID) {
            throw new Error("Invalid Device Handle");
        }
        return handle;
    }

    private checkSuspended(status: number): void {
        if (status === DEVICE_SUSPENDED) {
            throw new DeviceLockedException();
        }
    }

    private checkNetwork(wifiConnection: number): void {
        if (wifiConnection !== WIFI_CONNECTED) {
            throw new NetworkConnectionException();
        }
    }
}

