import React, { useState } from "react";

export function useSwitch(
    initialState = false
): [
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    toggle: () => void
] {
    const [open, setOpen] = useState(initialState);

    const onOpen = React.useCallback(() => setOpen(true), []);
    const onClose = React.useCallback(() => setOpen(false), []);
    const toggle = React.useCallback(() => setOpen((prev) => !prev), []);

    return [open, onOpen, onClose, toggle];
}
