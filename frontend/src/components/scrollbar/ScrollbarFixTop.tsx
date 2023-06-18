import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import Wrapper from '../wrapper/Wrapper';
import { classNames } from '../../utils';
import Scrollbar from './ScrollbarThumb';

const ScrollbarFixTop = ({
    className = '',
    header,
    children,
    gap = '5',
    marginBottom = '0px',
}: {
    className?: string;
    header: ReactNode;
    children: ReactNode;
    gap?: string;
    marginBottom?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [bodyHeight, setBodyHeight] = useState(0);

    useLayoutEffect(() => {
        const element = ref.current;
        if (element === null) return;
        console.log(element.offsetTop);
        setBodyHeight(element.offsetTop);
    }, []);

    return (
        <Wrapper
            gap={gap}
            className={classNames(
                'p-5 flex-shrink-0 sticky top-[calc(var(--top-bar-height)_+_20px)] h-fit',
                className,
            )}
            style={{ marginBottom }}
        >
            {header}
            <div className="overflow-y-hidden" ref={ref}>
                <div
                    className="overflow-y-auto scrollbar hidden-scrollbar relative"
                    style={{
                        height: `calc(100vh - var(--top-bar-height) - ${bodyHeight}px - 40px - ${marginBottom} )`,
                    }}
                >
                    {children}
                    <Scrollbar />
                </div>
            </div>
        </Wrapper>
    );
};

export default ScrollbarFixTop;
