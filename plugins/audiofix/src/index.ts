import { instead } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const AudioManager = findByProps("setCommunicationModeOn");

let unpatch: (() => void) | undefined;

export function onLoad() {
    if (!AudioManager || typeof AudioManager.setCommunicationModeOn !== "function") {
        console.error("[BluetoothFix] AudioManager method not found");
        return;
    }

    unpatch = instead(
        "setCommunicationModeOn",
        AudioManager,
        () => {
            console.log("[BluetoothFix] Blocked communication mode");
        }
    );
}

export function onUnload() {
    unpatch?.();
    unpatch = undefined;
}
