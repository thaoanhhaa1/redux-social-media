import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import Wrapper from '../wrapper/Wrapper';
import { classNames } from '../../utils';
import Scrollbar from './ScrollbarThumb';

const ScrollbarFixTop = ({
    className = '',
    header,
    children,
    gap = '5',
}: {
    className?: string;
    header: ReactNode;
    children: ReactNode;
    gap?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [bodyHeight, setBodyHeight] = useState(0);

    useLayoutEffect(() => {
        const element = ref.current;
        if (element === null) return;
        setBodyHeight(element.getBoundingClientRect().top || 0);
    }, []);

    return (
        <Wrapper
            gap={gap}
            className={classNames(
                'p-5 flex-shrink-0 sticky top-[calc(var(--top-bar-height)_+_20px)] h-fit',
                className,
            )}
        >
            {header}
            <div className="overflow-hidden" ref={ref}>
                <div
                    className="overflow-y-auto scrollbar hidden-scrollbar relative"
                    style={{ height: `calc(100vh - ${bodyHeight}px - 20px)` }}
                >
                    {children}
                    <Scrollbar />
                </div>
            </div>
        </Wrapper>
    );
};

export default ScrollbarFixTop;
