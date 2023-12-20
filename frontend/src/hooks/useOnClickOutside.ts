import { RefObject } from 'react';

import { useEventListener } from 'usehooks-ts';

type Handler = () => void;

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
): void {
    useEventListener('click', (event) => {
        const el = ref?.current;

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return;
        }

        handler();
    });
}
