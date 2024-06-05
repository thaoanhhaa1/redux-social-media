import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { classNames } from '../../utils';
import ScrollbarCustomize from '../ScrollbarCustomize';
import Wrapper from '../wrapper/Wrapper';

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
        if (!element) return;
        setBodyHeight(element.offsetTop);
    }, []);

    return (
        <Wrapper
            gap={gap}
            className={classNames(
                'p-2 xxs:p-3 xs:p-4 dl:p-5 flex-shrink-0 sticky top-[calc(var(--top-bar-height)_+_8px)]-2 xxs:top-[calc(var(--top-bar-height)_+_12px)]-3 xs:top-[calc(var(--top-bar-height)_+_16px)]-4 dl:top-[calc(var(--top-bar-height)_+_20px)]-5 h-fit',
                className,
            )}
            style={{ marginBottom }}
        >
            {header}
            <div ref={ref}>
                <ScrollbarCustomize
                    style={{
                        maxHeight: `calc(100vh - var(--top-bar-height) - ${bodyHeight}px - 40px - ${marginBottom} )`,
                    }}
                >
                    {children}
                </ScrollbarCustomize>
            </div>
        </Wrapper>
    );
};

export default ScrollbarFixTop;
