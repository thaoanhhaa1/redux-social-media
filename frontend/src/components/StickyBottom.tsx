import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

const StickyBottom = ({ children }: { children: ReactNode }) => {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (ref.current === null) return;
        const element: HTMLDivElement = ref.current;
        setHeight(element.clientHeight);
    }, []);

    return (
        <div
            style={{ top: `calc(100vh - ${height}px)` }}
            className="h-fit sticky"
            ref={ref}
        >
            {children}
        </div>
    );
};

export default StickyBottom;
