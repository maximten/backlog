import { useEffect } from 'react'
import { entriesOf } from 'src/types'

export enum KeyCodes {
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    N = 78,
    D = 68,
    SPACE = 32,
    BACKSPACE = 8,
}

const CTRL_CODE = 1000;
const SHIFT_CODE = 10000;
const ALT_CODE = 100000;

type Bindings = Record<number, {
    isCtrlPresed?: boolean,
    isShiftPressed?: boolean,
    isAltPresed?: boolean,
    callback: (e: KeyboardEvent) => void
}>

export const useKeyboard = (bindings: Bindings) => useEffect(() => {
    if (!window) {
        return
    }
    const getEventHash = (
        keyCode: number,
        isCtrlPresed: boolean,
        isShiftPressed: boolean,
        isAltPresed: boolean
    ) =>
        Number(keyCode) +
        Number(isCtrlPresed || false) * CTRL_CODE +
        Number(isShiftPressed || false) * SHIFT_CODE +
        Number(isAltPresed || false) * ALT_CODE
    const callbackMap = entriesOf(bindings)
        .reduce((carry, [keyCode, {
            isCtrlPresed,
            isShiftPressed,
            isAltPresed,
            callback
        }]) => {
            const hash = getEventHash(
                keyCode,
                isCtrlPresed,
                isShiftPressed,
                isAltPresed
            );
            carry[hash] = callback;
            return carry;
        }, {})
    const keydownCallback = (e: KeyboardEvent) => {
        const hash = getEventHash(e.keyCode, e.ctrlKey, e.shiftKey, e.altKey)
        if (hash in callbackMap) {
            callbackMap[hash](e)
        }
        console.log('e.keyCode', e.keyCode)
    }
    window.addEventListener('keydown', keydownCallback)
    return () => {
        window.removeEventListener('keydown', keydownCallback)
    }
}, [bindings])