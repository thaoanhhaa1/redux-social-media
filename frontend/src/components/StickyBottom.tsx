import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

const StickyBottom = ({ children }: { children: ReactNode }) => {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [isBottom, setBottom] = useState(true);

    useLayoutEffect(() => {
        if (ref.current === null) return;
        const element: HTMLDivElement = ref.current;
        const height = element.clientHeight;
        const screenHeight = window.innerHeight - 95;

        setHeight(height);
        setBottom(screenHeight < height);
    }, []);

    return (
        <div
            style={{ top: isBottom ? `calc(100vh - ${height}px)` : '95px' }}
            className="h-fit sticky"
            ref={ref}
        >
            {children}
        </div>
    );
};

export default StickyBottom;
